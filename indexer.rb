require 'parser/current'

class Indexer
  def initialize
    @paths = []
  end

  def add(path)
    @paths << path
  end

  def reload
    @paths.each do |p|
      ast = Parser::CurrentRuby.parse(File.read(p))
      puts ast_to_symbols(ast).inspect
    end
  end

  def ast_to_symbols(ast)
    return [] unless ast.respond_to?(:type)
    symbols = []
    case ast.type
      when :begin
        # Nothing here; just parse the children
        symbols += ast.children.map { |c| ast_to_symbols(c) }
      when :module, :class, :def
        # The first child is the name
        name = nil
        name_node = ast.children[0]
        if name_node.respond_to?(:type) && name_node.type == :const
          name = name_node.children[1]
          symbols << {type: ast.type, name: name, line: ast.loc.line}
        elsif name_node.is_a?(Symbol)
          name = name_node
        end
        if name
          symbols << {type: ast.type, name: name, line: ast.loc.line}
        end
        # The rest are actual children
        if ast.children.size > 1
          symbols += ast.children[1..-1].map { |c| ast_to_symbols(c) }
        end
    end
    symbols.select { |s| s.flatten.size > 0 }
  end
end


idx = Indexer.new()
idx.add(ARGV.first)
idx.reload
