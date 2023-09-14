// SESSIONS / LOGIN

const form = document.getElementById('loginForm')

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    console.log(form);
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value))
    const response = await fetch('/api/sessions/login',{
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json"
        }
    })
    console.log(response);
    const responseData = await response.json()
    if(responseData.status==="success"){
        //Redirijo al profile (desde el front)
        window.location.replace('/api/views/profile');
    }
    console.log(responseData);
})