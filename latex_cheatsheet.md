# Cheatsheet Y

## Colors
`\textcolor{`<sc style="font-variant: small-caps;">color</sc>`}{`...`}`  
where <sc style="font-variant: small-caps;">color</sc> can be `red`/`blue`/`green`/`orange`/`purple`/`violet`/`magenta`/`gray`/...  

For example, `$\textcolor{red}{r}$` gives $\textcolor{red}{r}$.  

## Annotate equations with lines
1. Mark the portion of the formula using `\tikzmarknode{`<sc style="font-variant: small-caps;">node name you define</sc>`}{`<sc style="font-variant: small-caps;">...</sc>`}`
2. Outside of your math, use `\annotate[yshift=`<sc style="font-variant: small-caps;">length</sc>`]{` `above`/`below` `}{`<sc style="font-variant: small-caps;">node name you define</sc>`}{`<sc style="font-variant: small-caps;">label text</sc>`}` to put labels above. The amount of `yshift` could be values such as `3ex` or `-4ex`.

## Over-/Under-brace
`\overbrace{`...`}^{`<sc style="font-variant: small-caps;">label</sc>`}`  
`\underbrace{`...`}_{`<sc style="font-variant: small-caps;">label</sc>`}`

For example, `$\overbrace{o}^{over}$` gives $\overbrace{o}^{over}$ or `$\underbrace{u}_{under}$` gives $\underbrace{u}_{under}$

## Add/Remove Horizontal Space
Use `\hspace{`<sc style="font-variant: small-caps;">length</sc>`}`. For example, `\hspace{3ex}` adds 3 `ex` of spaces or `\hspace{-3ex}` removes it. `ex` is a unit that roughly means the height of an 'x' in the current font.

## Simple Macros
If you write `\def\`<sc style="font-variant: small-caps;">cmd</sc>`{`...`}`. Then you can use `\`<sc style="font-variant: small-caps;">cmd</sc> as a stand-in for the segment between the braces.
