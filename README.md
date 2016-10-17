### a2g - code file generation made easy!

This is a small project for generating skeleton code for various *Angular 2* & *TypeScript* structures.

Actually, there's no need for such a tool as we already have [angular-cli](https://github.com/angular/angular-cli). Sadly, I couldn't use it because of some weird errors that were related to my current Angular 2 version.

However, I'd still recommend to use *angular-cli* as this little project is neither well designed nor very flexible.

#### Usage

Generating an **Angular2 Component**

`
a2g component foxtrott --dir ./some/dir
`

Result:

> ./some/dir: 
>            
>            |-> foxtrott.component.ts
>            |-> foxtrott.component.html
>            |-> foxtrott.component.css
>            |-> index.ts 

Generating an **Angular 2 Service**

`
a2g service unicorn --dir ./some/dir
`


Result: 

> ./some/dir:
>   
>          | --> unicorn.service.ts



Generating a **TypeScript Enum**

`
a2g enum foxtrott --dir ./some/dir --opt unicorn, charlie, kilo
`  

Result:
        
> ./some/dir:
>
>              | --> charlie.ts 
     

*Content of charlie.ts*

```typescript

export enum Foxtrott {
    Unicorn,
    Charlie,
    Kilo
}

```

Other possible structures are: 
    
* Angular 2 Directives
* Angular 2 Modules
* Angular 2 Pipes
* TypeScript Interfaces
* TypeScript Classes 

If your structure (class, component etc.) should be written in PascalCase just use **-** to separate words.

Example:

`
a2g component foxtrott-unicorn-charlie-kilo
`

This will produce a component named **FoxtrottUnicornCharlieKilo**

#### Short commands

| Structure        | Long           | Short  |
| :------------- |:-------------| :-----|
| Class      | a2g class NAME | a2g cl NAME |
| Component      | a2g component NAME      |   a2g c NAME |
| Directive | a2g directive NAME      | a2g d NAME |
| Enum | a2g enum NAME      | a2g e NAME |
| Interface | a2g interface NAME      | a2g i NAME |
| Module | a2g module NAME      | a2g m NAME |
| Pipe | a2g pipe NAME      | a2g p NAME |
| Service | a2g service NAME      | a2g s NAME |

#### Installation

`
npm i -g a2g 
`

or

`
yarn global add a2g
`

#### Building from source

`
npm run build:dev
`

For production

`
npm run build:prod
`

#### Tests

`
npm test
`

## Continuous testing

`
npm run watch:test
`

<img src="http://fs5.directupload.net/images/161017/rmdv48v8.png" witdh=500 height=500>

#### License

[MIT](https://github.com/brakmic/a2g/blob/master/LICENSE)

