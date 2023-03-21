const onLoad = () => {
  createDivForProjects(
    "project-codeeditor",
    "https://tinyurl.com/webcodeedit",
    "Code Editor",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/codeeditor"
  );

  createDivForProjects(
    "project-askmeaquestion",
    "https://sciencewolf.github.io/AskMeAQuestion/",
    "Ask Me A Question",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/askmeaquestion"
  );

  createDivForProjects(
    "project-randomcolor",
    "https://tinyurl.com/randcolors",
    "Random Color",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/randomcolor"
  );

  createDivForProjects(
    "project-todoapp",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/ToDoApp",
    "To Do App",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/todoapp"
  );

  createDivForProjects(
    "project-weatherapp",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/WeatherApp",
    "Weather App",
    "https://github.com/Sciencewolf/Javascript-Projects/tree/master/weatherapp"
  );
}


function createDivForProjects(div_ClassName, first_aTag_href, first_aTag_Text, second_aTag_href, second_aTag_Text = "[Source Code]") {
  const body = document.querySelector('body')
  const div = document.createElement('div')
  const a_first = document.createElement('a')
  const a_second = document.createElement('a')

  div.className = div_ClassName
  a_first.href = first_aTag_href
  a_first.innerHTML = first_aTag_Text
  a_first.target = "_blank"

  a_second.href = second_aTag_href
  a_second.innerHTML = second_aTag_Text
  a_second.target = "_blank"

  div.appendChild(a_first)
  div.appendChild(a_second)

  body.appendChild(div)
}
