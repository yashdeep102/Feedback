window.onload=()=>{
    console.log("connected");
    
    let add_btn=document.querySelector("#add_btn");
    let clear_btn=document.querySelector('#clear_btn');
    let close_popup=document.querySelector("#close_popup");  
    let fname=document.querySelector('#fname');
    let mname=document.querySelector('#mname');
    let lname=document.querySelector('#lname');
    let feedback_input=document.querySelector('#feedback_input');
    let gender=document.querySelectorAll(".gender");
    let list_box_container=document.querySelector("#list_box_container");
    
    let obj_list=[];
    let total_items=0;
    let allparams={
        fname:{msg:"",checked:false},
        mname:{msg:"",checked:true},
        lname:{msg:"",checked:false},
        feedback:{msg:"",checked:false},
        gender:{gen:"",checked:false}
    };
    fname.onchange=()=>{
        if(fname.value.length>40)
        {
            allparams.fname.checked=false;
        }else{
            allparams.fname.checked=true;
            allparams.fname.msg=fname.value;
        }
    };
    mname.onkeyup=()=>{
        if(mname.value.length>0){
            allparams.mname.msg=mname.value;
        }else{
            allparams.mname.msg="";
        }
    };
    lname.onchange=()=>{
        if(lname.value.length>40)
        {
            allparams.lname.checked=false;
        }else{
            allparams.lname.checked=true;
            allparams.lname.msg=lname.value;
        }
    };
    feedback_input.onchange=()=>{
        if(feedback_input.value.length>255)
        {
            allparams.feedback.checked=false;
        }else{
            allparams.feedback.checked=true;
            allparams.feedback.msg=feedback_input.value;
        }
    };
    
    gender[0].onclick=()=>{
        allparams.gender.msg="Mr.";
        allparams.gender.checked=true;
    }
    gender[1].onclick=()=>{
        allparams.gender.msg="Mrs.";
        allparams.gender.checked=true;
    }
    
    add_btn.onclick=()=>{
       if(allparams.fname.checked && allparams.lname.checked && allparams.feedback.checked && allparams.gender.checked){
            let per={
                "fname":allparams.fname.msg,
                "mname":allparams.mname.msg,
                "lname":allparams.lname.msg,
                "feedback":allparams.feedback.msg,
                "gender":allparams.gender.msg};
            obj_list.push(per);
            total_items++;
            display_work(obj_list);
            reset_object();
       }else{
           input_check_popup.style.transform="scaleY(1)";
       }
    };
    
    
    close_popup.onclick=()=>{
        input_check_popup.style.transform="scaleY(0)";
    }
    function display_work(all_msg_list){
        let childs_exist=list_box_container.lastElementChild;
        while(childs_exist)
        {
            childs_exist.remove();
            childs_exist=list_box_container.lastElementChild;
        } 
       for (let i = 0; i < all_msg_list.length; i++) {
           let box=document.createElement('div');
           box.className="box";
               let name=document.createElement('p');
               name.id="name";
               name.innerHTML=all_msg_list[i].gender+" "+all_msg_list[i].fname+" "+all_msg_list[i].mname+" "+all_msg_list[i].lname;
               let delete_btn=document.createElement('button');
               delete_btn.id='delete_btn';
               delete_btn.innerText="X";
               delete_btn.addEventListener('click',()=>{
                   obj_list.splice(total_items-1,1);
                   total_items--;
                   box.remove();
               });
               let msg=document.createElement('p');
               msg.id='msg';
               msg.innerText=all_msg_list[i].feedback;
           box.appendChild(name);
           box.appendChild(delete_btn);
           box.appendChild(msg);
           list_box_container.appendChild(box);
       }
    }
    function reset_object(){
        allparams={
            fname:{msg:"",checked:false},
            mname:{msg:"",checked:true},
            lname:{msg:"",checked:false},
            feedback:{msg:"",checked:false},
            gender:{gen:"",checked:false}
        };
        fname.value="";
        mname.value="";
        lname.value="";
        feedback_input.value="";
        gender[0].checked=false;
        gender[1].checked=false;
    }

    clear_btn.addEventListener('click',()=>{
        for (let i = 0; i < obj_list.length; i++) {
            obj_list.splice(i,);
            total_items--;
            while(list_box_container.firstChild){
                list_box_container.removeChild(list_box_container.firstChild);
              }
        }
    });
};
