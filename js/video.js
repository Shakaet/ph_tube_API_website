

// load and display data

// console.log("hello")

document.getElementById("search").addEventListener("keyup",(e)=>{

    loadVideo(e.target.value)

})

let removeActiveButton=()=>{

    let buttons= document.getElementsByClassName("btn-category")

    for (let btn1 of buttons){
        btn1.classList.remove("active")
    }
}

let loadData = async()=>{

    let res= await fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    let data=await res.json()
    console.log(data)
    console.log(data.categories)
    let result= DisplayData(data.categories)


}


let loadVideo = async(search_text='')=>{

    let res= await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search_text}`)
    let data=await res.json()
    console.log(data)
    console.log(data.videos)
    let result= DisplayVideos(data.videos)


}

let loadDetails=async(video)=>{

    let res= await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video}`)
    let data=await res.json()
    let result= displayDetails(data.video)



}

let displayDetails=(video)=>{
    console.log(video)

    let detailsContainer=document.getElementById("modal-content")

    detailsContainer.innerHTML=`
        <img src=${video.thumbnail}/>


        <p> ${video.description} </p>
    
    
    `

   

    //way 1

    // document.getElementById("show_modal").click()

    //way2

    document.getElementById("custom_modal").showModal()  // showModal eta daisy ui r function

}

let  loadCategoriesVideos= async(id)=>{

    let res= await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    let data=await res.json()
    console.log(data.category)

    removeActiveButton()

    let activeBtn=document.getElementById(`btn-${id}`)
    activeBtn.classList.add("active")
    let result=DisplayVideos(data.category)

    

}


let DisplayVideos=(videos)=>{

    let video_container=document.getElementById("videos")

    video_container.innerHTML=''

    if(videos.length===0){

        video_container.classList.remove("grid")



        video_container.innerHTML=`

        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">

        <img src="assets/Icon.png"/>

        <h1 class="text-center text-xl font-bold">No Content Here in this Category </h1>

        

        </div>
        
        
        `;
        return ;  
    }
    else{
        video_container.classList.add("grid")
    }

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


                ${video.others.posted_date?.length===0 ?"" :`<span class=" p-2 text-xs absolute right-2 bottom-2 bg-black rounded-full text-white">${hour} hour ${min} min </span>`}

                
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
                </div>
                 <p><button onclick="loadDetails('${video.video_id}')" class="btn text-sm btn-error mt-5"> Details </button</p>
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

        let btn_div=document.createElement("div")

        btn_div.innerHTML =`
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn m-3 btn-category">

          ${item.category}

        </button>
        
        
        `

    // let btn=document.createElement("button")
    // btn.classList="btn m-3"
   
    // btn.innerText=item.category

    container.appendChild(btn_div)
    }

  

    


}

loadData()



