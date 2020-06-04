let chapterList2 = document.querySelectorAll(".chapter-list-toc")
let allData = []

chapterList2.forEach((p, i)=>{
   let title = p.querySelector("h2")


   // let problems = q.querySelectorAll(".problem")
   var name = "chapter4"
   var problems = document.querySelectorAll(".problem")
   console.log(problems)

   function * problemGenerator(array){
       yield * array
   }

   var g = problemGenerator(problems)
   var problem = g.next()
   var  chapterJsonData;
   var jsonData = []
   recursion(problem)

   function recursion(problem){
       if (problem.done){
           // allData.push(chapterJsonData)
           // title.click()
           var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(chapterJsonData));
           var dlAnchorElem = document.createElement('a');
           dlAnchorElem.setAttribute("href",     dataStr     );
           dlAnchorElem.setAttribute("download", name + ".json");
           dlAnchorElem.click();
           return
       } else {

           problem.value.click()
           setTimeout(function(){
               let title = document.querySelector(".title")
                                   .innerText.split(", ")
               let html;

               if (!chapterJsonData){
                   chapterJsonData = {
                      "chapter": title[0],
                      "data": []
                   }
               }

               try{
                   html = document.querySelector(".TBS_SOLUTION .steps").innerHTML
               } catch {
                   html = "no solution"
               }

               let solutionJson = {
                   "questionChapter": title[0],
                   "questionNumber": title[1],
                   "html": html
               }
               console.log(solutionJson)
               chapterJsonData["data"].push(solutionJson)
               console.log(chapterJsonData);

               let nextProblem = g.next()
               recursion(nextProblem)
           }, 4000)

      }// else not finished next
  }// recursion

  if (i==chapterList2.length){
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData));
      var dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href",     dataStr     );
      dlAnchorElem.setAttribute("download", "data.json");
      dlAnchorElem.click();
  }
}) //chapterList2.forEach
