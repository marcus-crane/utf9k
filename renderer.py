import mistune
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import html


class MarkdownRenderer(mistune.Renderer):

    @staticmethod
    def block_code(code, lang=None):
        if not lang:
            return f'\n<pre class="ml3"><code class="hello">' \
                   f'{mistune.escape(code)}</code></pre>\n'
        lexer = get_lexer_by_name(lang, stripall=True)
        formatter = html.HtmlFormatter()
        return highlight(code, lexer, formatter).replace(
            '<div class="highlight">', '<div class="highlight br2 pb2 pt2">'
        ).replace('<pre>', '<pre class="ml3 mr3">')

    @staticmethod
    def block_quote(text):
        text = text.replace('<p>',
                            '<p class="pl3 bl bw2 b--light-purple lh-copy">')
        return text

    @staticmethod
    def link(link, _, content):
        return f'<a href="{link}" target="_blank" rel="noreferrer" ' \
               f'class="blue link">{content}</a>'

    @staticmethod
    def table(header, row):
        header = header.replace('<th>', '<th class="pv2 ph3 tl f6 fw6 ttu">')
        row = row.replace('<td>', '<td class="pv2 ph3">')
        return f'<table class="ba br2 w-100 pb2 pt2">{header}{row}</table>'


renderer = MarkdownRenderer()
