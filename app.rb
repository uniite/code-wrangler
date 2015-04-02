require 'json'
require 'sinatra'
require './indexer'


set :public_folder, 'public'

indexer = Indexer.new()
Dir.glob('example/**.rb').each do |path|
  indexer.add(path)
end
indexer.reload


get '/' do
  redirect '/index.html'
end

get '/files/get' do
  puts params.inspect
  path = params[:path]
  if path && File.exist?(path)
    content_type :json
    {
      contents: File.read(path),
      last_modified: File.mtime(path),
      path: path,
    }.to_json
  else
    status 404
  end
end

get '/symbols/find' do
  content_type :json
  indexer.index.fetch(params[:name], []).to_json
end
