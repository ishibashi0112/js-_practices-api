// users_josn 取得
async function getUsers(){
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return users;
};
//  posts_josn 取得
async function getPosts(){
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return posts;
};

// users_json,posts_jsonを結合
async function usersPosts(){
  const users = await getUsers()
  const posts = await getPosts()
  const usresPosts = []
  for (let i = 0; i < posts.length; i++) {
    const postId = posts[i].userId;
    const searchUserId = users.filter(function(user){
      return user.id == postId
    });
    posts[i].userId = searchUserId[0]
    usresPosts.push(posts[i]) 
  }
  return usresPosts
}

// view表示追加
async function addList(i,num){
  const posts = await usersPosts()
    const lists = document.getElementById("lists");
    const divs = document.createDocumentFragment();
    for (i; i < num; i++) {
      if(i < num){
      const list = document.createElement("li");
      const divUser = document.createElement("div");
      divUser.innerText = "from: " + posts[i].userId.name;
      divs.appendChild(divUser);
      const divTitle = document.createElement("div");
      divTitle.innerText ="title: "+  posts[i].title
      divs.appendChild(divTitle);
      const divBody = document.createElement("div");
      divBody.innerText ="body: " + posts[i].body
      divs.appendChild(divBody);
      list.appendChild(divs);
      lists.appendChild(list)
      }
    }
}

// 初期表示
let i = 0 ;
let num = 10
window.addEventListener("load",async function(){
  addList(i,num)
});

// クリック→ ＋10件
const more = document.getElementById("more")
more.addEventListener("click",async function(){
  i += 10
  num += 10
  console.log(i)
  addList(i,num)
})


