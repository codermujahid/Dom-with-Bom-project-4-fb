// get elemens
const post_form = document.getElementById('post_add_form');
const masg = document.querySelector('.masg');
const all_post = document.querySelector('.all_post');



//get all post
const getAllPost = () =>{

    let posts = readLSData('fb_post');

    let list = '';
    posts.reverse().map(data => {

        list +=`
        <div class="post-timeline-area">
        <div class="card shadow-sm my-4">
            <div class="card-body">
                <div class="post-auth-area">
                    <div class="user-info">
                        <img src="${data.aphoto}" alt="">
                        <div class="dtails">
                            <span>${data.aname}</span>
                            <span>2 h . <i class="fas fa-globe-asia "></i></span>
                        </div>
                    </div>
                    <!-- dropdown -->
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-ellipsis-h"></i>
                          
                        </a>
                      
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <li><a class="dropdown-item delet_post" post_id=${ data.id } href="#">Delete</a></li>
                          <li><a class="dropdown-item edit_post"  href="#">Edit</a></li>
                          <li><a class="dropdown-item"  href="#">Save</a></li>
                        </ul>
                      </div>
                </div> 

               <!-- post content area -->
                <div class="post-content-area">
                    <p>${data.pcontent}</p>
                </div>
            </div>
            <img src="${data.pphoto}" alt="">
            <div class="icon-area brdr">
                 
                <div class="icon-box my-2 mt-2">
                    <img src="./asets/img/like.png" alt="">
                    <span>Like</span>
                </div>
                <div class="icon-box my-2 mt-2">
                   <img src="./asets/img/comment.png" alt="">
                    <span class="text-bold">Comment</span>
                </div>
                <div class="icon-box my-2 mt-2">
                    <img src="./asets/img/share.png" alt="">
                    <span>Share</span>
                </div>
                
            </div>

            <div class="post-comment  pb-3">
                <a href="#"><img src="./asets/img/fb-allv009.jpg" alt=""></a>
                
                <div class="comment">
                    
                    <input type="text" placeholder="Write a comment…">
                    <button class="imoji"></button> 
                    <button class="photo-vedio"></button> 
                    <button class="gift"></button> 
                    <button class="sticar"></button> 
                </div>
            </div>
        </div>
       
        
    </div>
        
        
        `;


    })


    all_post.innerHTML= list;


}

getAllPost();



// get form submit
post_form.onsubmit = (e) => {

    e.preventDefault();


    // form data get
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    const { aname, aphoto, pphoto, pcontent} = Object.fromEntries(form_data.entries());

    //creat a random
    const randId = Math.floor(Math.random() * 1000000) +'_'+ Date.now();

    // validation
    if (!aname || !aphoto || !pcontent || !pphoto) {
        masg.innerHTML = setAlert('All fields are requird');

    }else{
        createLSData('fb_post', { ...data, id : randId});
        e.target.reset();
        getAllPost();

    }



}

// data delet
all_post.onclick = (e) => {
    

    e.preventDefault();

    // post delet
    if (e.target.classList.contains('delet_post')) {
        
        //get post id
        const postId = e.target.getAttribute('post_id');
        

        //get all post
        const posts = readLSData('fb_post');


        // delet data arey
        const deleted_data = posts.filter(data => data.id !== postId);

        //now update new data 
        updateLSData('fb_post', deleted_data);

        getAllPost();

         
        
    }
} 
 