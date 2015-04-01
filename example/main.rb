require './counter.rb'
require './util.rb'


def main(text)
	text = parse_text(text)
	c = Counter.new(text)
	puts "#{c.count} words"
end

main(STDIN.read)
