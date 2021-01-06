let patchsContainer = document.querySelector(".patchsContainer")
let activitiesGallery = document.querySelector(".activitiesGallery")



  function showGallery(activitiesData){
    activitiesGallery.innerHTML = ""
    activitiesData.forEach(activity=>{
      console.log(activity);
        let activityContainer = document.createElement("div")
        activityContainer.classList.add("activityContainer")

        // activity name
        let title = document.createElement("h1")
        title.innerText = activity.name

        // bigIMage
        let bigImageContainer = document.createElement("div")
        bigImageContainer.classList.add("bigImageContainer")
        let bigImage = document.createElement("img")
        let imageCaption = document.createElement("div")
        bigImage.src = activity.photoArray[0].imageLink
        imageCaption.innerText = activity.photoArray[0].caption
        bigImageContainer.append(bigImage, imageCaption)

        // thumbnails
        let thumbnailsContainer = document.createElement("div")
        thumbnailsContainer.classList.add("thumbnailsContainer")
        title.innerText = activity.name

        activity.photoArray.forEach((p, i)=>{
            let thumbnail = document.createElement("img")
            thumbnail.classList.add("thumbnail")
            thumbnail.src = p.imageLink
            if (i!=0){
                thumbnail.style.opacity = 0.5
            }

            thumbnailsContainer.append(thumbnail)
            thumbnail.addEventListener("click", function(){
                bigImage.src = p.imageLink
                imageCaption.innerText = p.caption
                let allThumbnails =  thumbnailsContainer.querySelectorAll(".thumbnail")
                console.log(allThumbnails);
                allThumbnails.forEach((item, i) => {

                    item.style.opacity = 0.5
                });
                this.style.opacity = 1
            })
        })

        activityContainer.append(title, bigImageContainer, thumbnailsContainer)
        activitiesGallery.append(activityContainer)
    })
}

data.forEach((p, i)=>{
    let patchContainer = document.createElement("div")
    patchContainer.classList.add("patchContainer")

    let classTitle = document.createElement("h3")
    classTitle.innerText = p.class

    let image = document.createElement("img")
    image.classList.add("patchImage")
    console.log(p.patchImageLink);
    image.src = p.patchImageLink

    patchContainer.append(classTitle, image)
    patchsContainer.append(patchContainer)

    patchContainer.addEventListener("click", function(){
        showGallery(p.activities);
    })

    if (i == 0){
        showGallery(p.activities);
    }
})
