### a2g - code file generation made easy!

This is a small project for generating skeleton code for various (angular2-oriented) structures.

Actually, there's no need for such a tool as we already have [angular-cli](https://github.com/angular/angular-cli) but due to some reasons I couldn't use it for my current project. There were some errors I didn't want to fiddle with around as
I was only searching for some easy way to generate a bunch of files.

However, I'd still recommend to use *angular-cli* as this little project is neither well designed nor very flexible.

#### Usage

Generating an **Angular2 Component**

`
a2g component dir=./some/dir foxtrott   [*dir* is optional]
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
a2g service dir=./some/dir unicorn
`


Result: 

> ./some/dir:
>   
>          | --> unicorn.service.ts



Generating a **TypeScript Enum**

`
a2g enum dir=./some/dir foxtrott unicorn charlie kilo
`  

*The following rule only applies to Enums*

*foxtrott* will become the name of enum. The rest will be used as
enum entries.


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
a2g component dir=./some/dir foxtrott-unicorn-charlie-kilo
`

This will produce a component named **FoxtrottUnicornCharlieKilo**


#### Installation

`
npm i -g a2g 
`

or if you're more *modern*

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

<img src="http://fs5.directupload.net/images/161015/yqo2mzzm.png" witdh=500 height=500>

#### License

[MIT](https://github.com/brakmic/a2g/blob/master/LICENSE)

