const cats = require('./cats');

const page = (content) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    ${content}
  </body>
  </html>
  `
}

const homePage = () => {
  return page(`
    <h1>Welcome to the cat API!</h1>
    <ul>
      <li>/ - this page</li>
      <li><a href="/cats">/cats</a> - list of cats</li>
      <li>/cats/&lt;id&gt; - a specific cat</li>
    </ul>
  `);
}

const catList = () => {
  let allCats = Object.keys(cats);

  let catItems = allCats.map((cat) => {
    return `<li><a href="/cats/${cat}">${cat}</a></li>`
  });

  return page(`
    <ul>
      ${catItems.join('')}
    </ul>
  `);
}

const catDetails = (name) => {
  const theCat = cats[name];
  if (theCat) {
    return page(`
      <p>${JSON.stringify(theCat)}</p>
      <br>
      <a href="/cats">Return to cat list</a>
    `);
  } else {
    return page(`
      <h1>Cat not found</h1>
      <a href="/cats">Return to cat list</a>
    `);
  }
}

const mainHandler = (req, res) => {
  console.log(req.url);
  if (req.url === '/') {
    res.end(homePage());
  } else if (req.url.startsWith('/cats') && req.url.length > 5) {
    let theCatName = req.url.split('/')[2];
    console.log(theCatName);
    res.end(catDetails(theCatName));
    // res.end('a cat goes here')
  } else if (req.url.startsWith('/cats')) {
    res.end(catList());
  } else {
    res.end('Hello!');
  }

};


module.exports = mainHandler;
