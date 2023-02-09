# Cheatsheet X
## General Syntax
_<span style="font-variant:small-caps;">selectors...</span>_ `{`  
&nbsp;&nbsp;_<span style="font-variant:small-caps;">attribute-key</span>_`:` _<span style="font-variant:small-caps;">value</span>_`;`  
&nbsp;&nbsp;_<span style="font-variant:small-caps;">attribute-key</span>_`:` _<span style="font-variant:small-caps;">value</span>_`;`  
&nbsp;&nbsp;_..._  
`}`  
Generally, you style your math expressions by selecting a portion of it and apply styles with a block of attributes.
### Selectors

#### Literal Selectors - `$` _<span style="font-variant:small-caps;">$\LaTeX$</span>_ `$`
You can select any well-formed segment of your LaTeX math by enclosing them in a pair of `$`'s.

You can use wildcards in your literal selectors. To match any _single token/group_, use `?`. For a _sequence of any length_, use `*`. Note that wildcards are bounded by `{`...`}` groups and `*` selects the longest possible match.

To match the literal character of the wildcards use `\?` for "?" or `\*` for "*".

#### Selector Combinators 
You can combine selectors with some simple logical operations.

##### Union - `,`
_<span style="font-variant:small-caps;">selector</span>_`,`_<span style="font-variant:small-caps;">selector</span>_  

For example, `$x$, $y$` would select any $x$ and any $y$. It is the same as writing the same style block for both selectors.
### Attributes
To apply styles to the selected elements you use the following attributes in the styling block (the part enclosed in `{`...`}`),
|_<span style="font-variant:small-caps;">attribute-key</span>_|_<span style="font-variant:small-caps;">value</span>_|
|---------|----------------------|
| `color` | `red`/`blue`/`green`/`orange`/`purple`/`violet`/`magenta`/`gray`/... |
| `label` | any _<span style="font-variant:small-caps;">string</span>_ terminated by the attribute-dividing `;` |
| `label-position` | `above`/`below`/`auto` |
| `label-marker` | `extent`/`line`/`none` |

## Example
| FFL | LaTeX | Output |
|-----|-------|--------|
| `$x$ { color: blue; }`<br>`$m_\?$ { color: red; }`<br>`.subscript { color: green }` | `$f(x)=\frac{x}{m_0}+b$` | <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1.6136em; vertical-align: -0.6036em;"></span><span class="mord ffl-5e95f8f6-b247-440d-bf55-81e8f95a6940 visible"><span class="mord visible"><span class="mord mathnormal visible" style="margin-right: 0.1076em;">f</span><span class="mopen visible">(</span><span class="mord mathnormal fflMatch0-x visible">x</span><span class="mclose visible">)</span><span class="mspace visible" style="margin-right: 0.2778em;"></span><span class="mrel visible">=</span><span class="mspace visible" style="margin-right: 0.2778em;"></span><span class="mord visible"><span class="mopen nulldelimiter visible"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist visible" style="height: 1.01em;"><span class="" style="top: -2.655em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight visible"><span class="mord mtight denominator fflMatch1-m___ visible"><span class="mord mathnormal mtight denominator fflMatch1-m___ visible">m</span><span class="msupsub denominator fflMatch1-m___"><span class="vlist-t vlist-t2 denominator fflMatch1-m___"><span class="vlist-r denominator fflMatch1-m___"><span class="vlist denominator fflMatch1-m___ visible" style="height: 0.3448em;"><span class="denominator fflMatch1-m___" style="top: -2.3448em; margin-left: 0em; margin-right: 0.0714em;"><span class="pstrut denominator fflMatch1-m___" style="height: 2.5357em;"></span><span class="sizing reset-size3 size1 mtight denominator fflMatch1-m___"><span class="mord mtight denominator fflMatch1-m___ visible"><span class="mord mtight denominator fflMatch1-m___ subscript visible">0</span></span></span></span></span><span class="vlist-s denominator fflMatch1-m___"><span class="denominator fflMatch1-m___">​</span></span></span><span class="vlist-r denominator fflMatch1-m___"><span class="vlist denominator fflMatch1-m___ visible" style="height: 0.3695em;"><span class="denominator fflMatch1-m___"></span></span></span></span></span></span></span></span></span><span class="" style="top: -3.23em;"><span class="pstrut" style="height: 3em;"></span><span class="frac-line" style="border-bottom-width: 0.04em;"></span></span><span class="" style="top: -3.485em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight visible"><span class="mord mathnormal mtight numerator fflMatch0-x visible">x</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist visible" style="height: 0.6036em;"><span class=""></span></span></span></span></span><span class="mclose nulldelimiter visible"></span></span><span class="mspace visible" style="margin-right: 0.2222em;"></span><span class="mbin visible">+</span><span class="mspace visible" style="margin-right: 0.2222em;"></span><span class="mord mathnormal visible">b</span></span></span></span></span><style>.ffl-5e95f8f6-b247-440d-bf55-81e8f95a6940 .fflMatch0-x.visible { color: blue; } .ffl-5e95f8f6-b247-440d-bf55-81e8f95a6940 .fflMatch1-m___.visible { color: red; } .ffl-5e95f8f6-b247-440d-bf55-81e8f95a6940 .subscript.visible { color: green; }</style></span> |