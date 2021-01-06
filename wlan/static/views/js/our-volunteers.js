let content = document.querySelector(".volunteersContainer")
console.log(data);
data.forEach((p, i)=>{

      let container = document.createElement("div")
      let separator = document.createElement("hr")

      if (i == 0){
          container.classList.add("volunteerBox", "first")
      } else {
          container.classList.add("volunteerBox")
      }


      // volunteer introduction
      let text = document.createElement("div")
      text.classList.add("volunteerText")
      let name = document.createElement("h2")
      if ( i % 2 == 0 ){
          name.classList.add("left")
      } else {
          name.classList.add("right")
      }

      name.innerText = p.name
      let intro = document.createElement("div")
      intro.innerText = p.content
      text.append(name, intro)

      // volunteer photo
      let image = document.createElement("img")
      image.src = p.link


      if ( i % 2 == 0 ){
          // text: left, picture: right
          container.append(text, image)
      } else {
        // text: right, picture: left
        container.append(image, text)
      }
      content.append(container, separator)

})
