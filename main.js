const onLoadJSProject = () => {
  createDivForProjects(
    "project-codeeditor",
    "https://codeeditorproject.glitch.me/",
    "Code Editor",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/codeeditor"
  );

  // createDivForProjects(
  //   "project-askmeaquestion",
  //   "https://askmeaquestionproject.glitch.me/",
  //   "Ask Me A Question",
  //   "https://github.com/Sciencewolf/Javascript-Projects/tree/master/askmeaquestion"
  // );

  createDivForProjects(
    "project-randomcolor",
    "https://randomcolorproject.glitch.me/",
    "Random Color",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/randomcolor"
  );

  createDivForProjects(
    "project-todoapp",
    "https://todoappproject.glitch.me/",
    "To Do App",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/todoapp"
  );

  createDivForProjects(
    "project-weatherapp",
    "https://weatherappproject.glitch.me/",
    "Weather App",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/weatherapp"
  );

  // createDivForProjects(
  //   "project-cryptomarket",
  //   "https://cryptomarketproject.glitch.me/",
  //   "CryptoMarket",
  //   "https://github.com/Sciencewolf/Javascript-Projects/tree/master/cryptomarket"
  // )
}

function createDivForProjects(div_ClassName, first_aTag_href, first_aTag_Text, second_aTag_href) {
  const body = document.querySelector('body')
  const div = document.createElement('div')
  const a_first = document.createElement('a')
  const a_second = document.createElement('a')

  div.className = div_ClassName
  a_first.href = first_aTag_href
  a_first.innerHTML = first_aTag_Text
  a_first.target = "_blank"

  a_second.href = second_aTag_href
  a_second.innerHTML = "[Source Code]"
  a_second.target = "_blank"

  div.appendChild(a_first)
  div.appendChild(a_second)

  body.appendChild(div)
}
