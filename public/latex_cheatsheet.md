# Cheatsheet Y

## Colors
`\textcolor{`<sc style="font-variant: small-caps;">color</sc>`}{`...`}`  
where <sc style="font-variant: small-caps;">color</sc> can be `red`/`blue`/`green`/`orange`/`purple`/`violet`/`magenta`/`gray`/...  

For example, `$\textcolor{red}{r}$` gives $\textcolor{red}{r}$.  

## Annotate equations with lines
1. select the portion of the formula using `\tikzmarknode{`<sc style="font-variant: small-caps;">node_name_you_define</sc>`}{`<sc style="font-variant: small-caps;">LaTeX_segment_you_want</sc>`}`
2. use `\annotate[yshift=3ex]{above}{`<sc style="font-variant: small-caps;">node_name_you_define</sc>`}{`<sc style="font-variant: small-caps;">label_text</sc>`}` to put labels above; use `\annotate[yshift=-3ex]{below}{`<sc style="font-variant: small-caps;">node_name_you_define</sc>`}{`<sc style="font-variant: small-caps;">label_text</sc>`}`  to put labels below. You can always customize the amount of yshift.

## Over-/Under-brace
`\overbrace{`...`}^{`<sc style="font-variant: small-caps;">brace-label</sc>`}`  
`\underbrace{`...`}_{`<sc style="font-variant: small-caps;">brace-label</sc>`}`

For example, `$\overbrace{o}^{over}$` gives $\overbrace{o}^{over}$ or `$\underbrace{u}^{under}$` gives $\underbrace{u}_{under}$

## Add/remove horizontal space
Use `\hspace{`<sc style="font-variant: small-caps;">length</sc>`}`. For adding extra space, you can do `\hspace{3ex}`; for removing extra space, you can do `\hspace{-3ex}`. You can always customize the length of the space.
