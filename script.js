let students = JSON.parse(localStorage.getItem("students")) || [];

// LOGIN
function login(){
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if(u==="admin" && p==="1234"){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("app").style.display="block";
    displayStudents();
  } else {
    alert("Wrong credentials");
  }
}

// DEMO DATA
if(students.length===0){
  students = [
    {name:"Aarav",roll:"1",marks:85,attendance:90},
    {name:"Riya",roll:"2",marks:92,attendance:95},
    {name:"Kabir",roll:"3",marks:45,attendance:60}
  ];
}

// LOGIC
function grade(m){
  if(m>=85) return "A";
  if(m>=70) return "B";
  if(m>=50) return "C";
  return "F";
}

function remark(m,a){
  if(m<50) return "Needs Improvement";
  if(a<75) return "Low Attendance";
  return "Good";
}

// ADD
function addStudent(){
  let name=nameInput.value;
  let roll=rollInput.value;
  let marks=parseInt(marksInput.value);
  let att=parseInt(attendance.value);

  students.push({name,roll,marks,attendance:att});
  save();
}

// DELETE
function del(i){
  students.splice(i,1);
  save();
}

// SAVE
function save(){
  localStorage.setItem("students",JSON.stringify(students));
  displayStudents();
}

// DISPLAY
function displayStudents(){
  let list=document.getElementById("list");
  let leaderboard=document.getElementById("leaderboard");
  list.innerHTML="";
  leaderboard.innerHTML="";

  let sorted=[...students].sort((a,b)=>b.marks-a.marks);

  // leaderboard
  sorted.slice(0,3).forEach(s=>{
    leaderboard.innerHTML+=`<div class="card">🏆 ${s.name} (${s.marks})</div>`;
  });

  students.forEach((s,i)=>{
    list.innerHTML+=`
    <div class="card">
      <h3>${s.name}</h3>
      <p>Marks: ${s.marks} | Grade: ${grade(s.marks)}</p>
      <p>Attendance: ${s.attendance}%</p>
      <p>${remark(s.marks,s.attendance)}</p>
      <button onclick="del(${i})">Delete</button>
    </div>`;
  });

  document.getElementById("total").innerText="Total: "+students.length;
  document.getElementById("top").innerText="Top: "+sorted[0].name;
  document.getElementById("avg").innerText="Avg: "+(students.reduce((a,b)=>a+b.marks,0)/students.length).toFixed(1);

  drawChart();
}

// CHART
function drawChart(){
  let ctx=document.getElementById("chart");
  new Chart(ctx,{
    type:'bar',
    data:{
      labels:students.map(s=>s.name),
      datasets:[{
        label:'Marks',
        data:students.map(s=>s.marks)
      }]
    }
  });
}

// EXPORT PDF
function exportPDF(){
  window.print();
}

// DARK MODE
function toggleTheme(){
  document.body.classList.toggle("light");
}