

// load and display data

// console.log("hello")

let loadData = async()=>{

    let res= await fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    let data=await res.json()
    console.log(data)
    console.log(data.categories)
    let result= DisplayData(data.categories)


}


let loadVideo = async()=>{

    let res= await fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    let data=await res.json()
    console.log(data)
    console.log(data.videos)
    let result= DisplayVideos(data.videos)


}


let DisplayVideos=(videos)=>{

    let video_container=document.getElementById("videos")

    for(let video of videos){
        console.log(video)

        let card= document.createElement("div")

        card.classList="card bg-base-100"
        let time= video.others.posted_date

        let hour= parseInt(time/3600)
        let sec= parseInt(time%3600)
        let min= parseInt(sec/60)

        card.innerHTML=`

                    <figure class="h-[200px] relative">
                <img
                src=${video.thumbnail}
                alt="Shoes"class="h-full w-full object-cover" />


                ${video.others.posted_date?.length===0 ?"" :`<span class=" p-2 absolute right-2 bottom-2 bg-black rounded-full text-white">${hour} hour ${min} min </span>`}

                
            </figure>
            <div class="px-2 py-3 flex gap-3">
                <div>
                <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
                </div>

                <div>
                <h2 class="font-bold"> ${video.title}</h2>

                <div class="flex items-center gap-2">
                <p> ${video.authors[0].profile_name} </p>

                ${video.authors[0].verified=== true ?`<img class="w-5" src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-2/24/comment-verify-64.png">`:""}

                

                </div>
                <p> </p>
                <p> </p>
                </div>
                </div>
            </div>
                    
        
        
        `

        video_container.appendChild(card)
    }

}

loadVideo()



// {category_id: '1001', category: 'Music'}
// category
// : 
// "Music"
// category_id
// : 
// "1001"


let DisplayData=(categories)=>{

    // categories.forEach((item)=>{
    //     console.log(item)

    // })

    let container= document.getElementById("categories")
    container.classList=" flex justify-center py-2"
    

    for(let item of categories){
        console.log(item)
        // create a button

    let btn=document.createElement("button")
    btn.classList="btn m-3"
   
    btn.innerText=item.category

    container.appendChild(btn)
    }

  

    


}

loadData()

