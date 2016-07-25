var value;

function get_details() {
    var manufacturer=$('#manufacturer option:selected').text();

    
   
    /*
    var startdate=document.getElementById("startdate").value;
    var enddate=document.getElementById("enddate").value;
    if(startdate=="" || enddate=="")
        swal("enter dates");
    else{
        */
    var name1,name2,name3,name4;
    $("#fill >tbody").empty();
    //alert(manufacturer);
    
    $.ajax({
        type: "GET",
        cache: "false",
        url: "http://localhost:8080/mi_asset-management/rest/assets/register/manufacturers/manufacturer/"+manufacturer,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('assets_infoes').each(function() {
                $(this).find("Assets_info").each(function() {


                    $(this).find("_asset_number").each(function() {
                        name1 = $(this).text();

                    });



                    $(this).find("_user_ID").each(function() {
                        name2 = $(this).text();



                    });

                   

                    

                   
/*
                    $(this).find("_department").each(function() {
                        name7 = $(this).text();


                    });
                */

                
                    



                    $(this).find("_manufacturer").each(function() {
                        name3 = $(this).text();


                    });

                    $(this).find("_model_number").each(function() {
                        name4 = $(this).text();


                    });
                    var button='<input type="button" value="register" style="background-color:black" class="reg" onclick="local(\''+name1+'\')"/>'
                    var get_notified="<input type='button' value='get notified'/>"
                    
                        if(name2=="0"){
                            $("#fill").append('<tbody><tr col-md-3 name="table_rows" class="button" style="padding:60px;background-color:#40bf79;width:500px;color:white"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"available"+'</td>+<td>'+button+'</td></tr></tbody>');
                    
                        }
                       else if(name2.search("-")!=-1){
                       
                          $("#fill").append('<tbody><tr col-md-3 name="table_rows" class="button" style="padding:60px;background-color: #FFD700;width:500px;color:white"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"not sure"+'</td>+<td>'+"checkin unconfirmed"+'</td></tr></tbody>');


                        }
                        else
                        {
                            $("#fill").append('<tbody><tr  col-md-3 name="table_rows" style="padding:60px;width:500px;"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"notavailable"+'</td>+<td>'+get_notified+'</td></tr></tbody>');
                        }

                    
          name3 = name1 = name4 =name2= "";

                });

            });



        }

    });

  
}



function get_manufacturers() {
    var name;
    var previous_manufacturer=[];
    var previous_modelnumber=[];

    $.ajax({
        type: "GET",
        cache: "false",
        dataType: "xml",
        url: "http://localhost:8080/mi_asset-management/rest/assets/manufacturers",
        success: function(xml) {

               name1=name2="";

            $(xml).find('assets_infoes').each(function() {


                $(this).find("_manufacturer").each(function() {
                    name1 = $(this).text();
                    if(previous_manufacturer.indexOf(name1)== -1){  //to avoid repetitions from server side


                    $("#manufacturer").append("<option>" + name1 + "</option>");
                    previous_manufacturer.push(name1);
                }


                });

                  $(this).find("_model_number").each(function() {
                    name2= $(this).text();
                    if(previous_modelnumber.indexOf(name2)== -1){

                    $("#modelno").append("<option>" + name2 + "</option>");
                    previous_modelnumber.push(name2);
                }


                });


           
                            


            });
        }


    });

    system_date();

}

      
function local(asset_number){
    swal({
        title: "Are you sure?",
        text: "would you like to register",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, go for it!",
        closeOnConfirm: false
    }, function() {
        

 
$("#modelno").value;
//var manufacturer=$('#manufacturer :selected').text();

/*
if($('#modelno :selected').text()!="")
   var modelno=$('#modelno :selected').text();
*/
var date=document.getElementById("startdate").value; 

if(date!="")
  var start_date=date;
else
    swal("please enter startdate");


if(document.getElementById("enddate").value!="")
  var end_date=document.getElementById("enddate").value;
else
    swal("please enter end date");

var userid=Math.floor((Math.random()*10)+1); //remove afterwards
  

  $.ajax({
        type: "POST",
        cache: "false",
        url: "http://localhost:8080/mi_asset-management/rest/assets/register_user_device/"+userid+"/"+asset_number+"/"+start_date+"/"+end_date,
        dataType: "xml",
        success: function(xml) {
            
            swal("Registered!", "Selected device is registered", "success");
         setTimeout(function(){location.reload()},4000); 
          
            
           
        }
    });
});
}


function system_date(){
var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;


$("#startdate").val(today);
}


function get_modelnumbers(){
    var mod=document.getElementById("modelno");
   var modelno= mod.options[mod.selectedIndex].text;
   
 var name1,name2,name3,name4;
    $("#fill >tbody").empty();
    //alert(manufacturer);
    
    $.ajax({
        type: "GET",
        cache: "false",
        url: "http://localhost:8080/mi_asset-management/rest/assets/register/manufacturers/model_number/"+modelno,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('assets_infoes').each(function() {
                $(this).find("Assets_info").each(function() {


                    $(this).find("_asset_number").each(function() {
                        name1 = $(this).text();

                    });



                    $(this).find("_user_ID").each(function() {
                        name2 = $(this).text();



                    });


                    $(this).find("_manufacturer").each(function() {
                        name3 = $(this).text();


                    });

                    $(this).find("_model_number").each(function() {
                        name4 = $(this).text();


                    });
                    var button='<input type="button" value="register" style="background-color:black" class="reg" onclick="local(\''+name1+'\')"/>'
                    var get_notified="<input type='button' value='get notified'/>"
                    
                        if(name2=="0"){
                            $("#fill").append('<tbody><tr col-md-3 name="table_rows" class="button" style="padding:60px;background-color:#40bf79;width:500px;color:white"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"available"+'</td>+<td>'+button+'</td></tr></tbody>');
                    
                        }
                       else if(name2.search("-")!=-1){
                       
                          $("#fill").append('<tbody><tr col-md-3 name="table_rows" class="button" style="padding:60px;background-color: #FFD700;width:500px;color:white"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"not sure"+'</td>+<td>'+"checkin unconfirmed"+'</td></tr></tbody>');


                        }
                        else
                        {
                            $("#fill").append('<tbody><tr  col-md-3 name="table_rows" style="padding:60px;width:500px;"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"notavailable"+'</td>+<td>'+get_notified+'</td></tr></tbody>');
                        }

                    
          name3 = name1 = name4 =name2= "";

                });

            });



        }

    });


}



function get_asset_number(){

     var model_no=$('#modelno option:selected').text();
   
      var name1,name2,name3,name4;
    $("#fill >tbody").empty();
    //alert(manufacturer);
    
    $.ajax({
        type: "GET",
        cache: "false",
        url: "http://localhost:8080/mi_asset-management/rest/assets/register/manufacturers/manufacturer/"+modelno,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('assets_infoes').each(function() {
                $(this).find("Assets_info").each(function() {


                    $(this).find("_asset_number").each(function() {
                        name1 = $(this).text();

                    });



                    $(this).find("_user_ID").each(function() {
                        name2 = $(this).text();



                    });


                    $(this).find("_manufacturer").each(function() {
                        name3 = $(this).text();


                    });

                    $(this).find("_model_number").each(function() {
                        name4 = $(this).text();


                    });
                    var button='<input type="button" value="register" style="background-color:black" class="reg" onclick="local(\''+name1+'\')"/>'
                    var get_notified="<input type='button' value='get notified'/>"
                    
                        if(name2=="0"){
                            $("#fill").append('<tbody><tr col-md-3 name="table_rows" class="button" style="padding:60px;background-color:#40bf79;width:500px;color:white"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"available"+'</td>+<td>'+button+'</td></tr></tbody>');
                    
                        }
                       else if(name2.search("-")!=-1){
                       
                          $("#fill").append('<tbody><tr col-md-3 name="table_rows" class="button" style="padding:60px;background-color: #FFD700;width:500px;color:white"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"not sure"+'</td>+<td>'+"checkin unconfirmed"+'</td></tr></tbody>');


                        }
                        else
                        {
                            $("#fill").append('<tbody><tr  col-md-3 name="table_rows" style="padding:60px;width:500px;"><td>' + name1 + '</td>+<td>' + name2 + '</td>+<td>' + name3 + '</td>++<td>' + name4 + '</td>+<td>'+"notavailable"+'</td>+<td>'+get_notified+'</td></tr></tbody>');
                        }

                    
          name3 = name1 = name4 =name2= "";

                });

            });



        }

    });


}


