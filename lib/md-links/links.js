"use strict";

const re = /<a[^>]*href="(https?:\/\/.*)"[^>]*>([^<]*)<\/a>/g;
const str = '<html>\n    <head></head>\n    <body>\n        <h1>Example</h1>\n        <p>Look a this great link : <a href="https://stackoverflow.com">Stackoverflow</a> http://anotherlinkoutsideatag</p>\n\n        Copyright <a href="https://stackoverflow.com">Stackoverflow</a>\n    </body>\';\n';
let m;
const links = [];

while ((m = re.exec(str)) !== null) {
  if (m.index === re.lastIndex) {
    re.lastIndex++;
  }

  console.log(m[0]); // The all substring

  console.log(m[1]); // The href subpart

  console.log(m[2]); // The anchor subpart

  links.push({
    match: m[0],
    // the entire match
    href: m[1],
    // the first parenthesis => (https?:\/\/.*)
    anchor: m[2] // the second one => ([^<]*)

  });
}