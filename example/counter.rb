module Foo
  class Counter < Object
    def initialize(text)
      @text = text
    end

    def count
  	  parse_words.size
    end
  
    def parse_words
  	  @text.split(' ')
    end
  end
end
