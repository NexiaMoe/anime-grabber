$("#descriptionBox").hide();
$("#samehadaku").hide();
// Anitoki
$("#h264_360").hide();
$("#h264_480").hide();
$("#h264_720").hide();
$("#h264_1080").hide();
$("#h265_480").hide();
$("#h265_720").hide();

// Samehadaku
$("#smhd_h264_360").hide();
$("#smhd_h264_480").hide();
$("#smhd_h264_720").hide();
$("#smhd_h264_1080").hide();
$("#smhd_h265_480").hide();
$("#smhd_h265_720").hide();

// --------------
// Pagination anitoki
// --------------


// ---------------
// Back Button
// ---------------
function back_page(page){
    mybutton = document.getElementById("back_btn");
    switch (page) {
        case "anitoki":
            $("#descriptionBox").hide();
            $("#h264_360").hide();
            $("#h264_480").hide();
            $("#h264_720").hide();
            $("#h264_1080").hide();
            $("#h265_480").hide();
            $("#h265_720").hide();
            $("#imgcnt").show();
            $("#back_btn").hide();
            $("#title").text("Anitoki Grabber")

            var del_elm = document.getElementById("descriptionBox")
            del_elm.innerHTML = `
            <div id="imgdesc" class="justify-content-center text-center pb-5">
            </div>
            <div id="description" style="margin-bottom: -40px; padding-bottom: 10%;"></div>
            <div class="justify-content-left container-download" id="download">
               <div id="h264_360" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H264 360p</h5>
               </div>
               <div id="h264_480" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H264 480p</h5>
               </div>
               <div id="h264_720" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H264 720p</h5>
               </div>
               <div id="h264_1080" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H264 1080p</h5>
               </div>
               <div id="h265_480" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H265 480p</h5>
               </div>
               <div id="h265_720" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H265 720p</h5>
               </div>
            </div>`
            break;
        case "samehadaku":
            $("#smhd_descriptionBox").hide();
            $("#smhd_h264_360").hide();
            $("#smhd_h264_480").hide();
            $("#smhd_h264_720").hide();
            $("#smhd_h264_1080").hide();
            $("#smhd_h265_480").hide();
            $("#smhd_h265_720").hide();
            $("#smhd_imgcnt").show();
            $("#back_btn").hide();
            $("#smhd_title").text("Samehadaku Grabber")


            var del_elm = document.getElementById("smhd_descriptionBox")
            del_elm.innerHTML = `
            <div id="smhd_imgdesc" class="justify-content-center text-center pb-5">
            </div>
            <div id="smhd_description" style="margin-bottom: -40px; padding-bottom: 10%;"></div>
            <div class="justify-content-left container-download" id="smhd_download">
               <div id="smhd_h264_360" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H264 360p</h5>
               </div>
               <div id="smhd_h264_480" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H264 480p</h5>
               </div>
               <div id="smhd_h264_720" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H264 720p</h5>
               </div>
               <div id="smhd_h264_1080" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H264 1080p</h5>
               </div>
               <div id="smhd_h265_480" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H265 480p</h5>
               </div>
               <div id="smhd_h265_720" style="display: none;">
                  <h5 class="pb-2 pt-2">Download H265 720p</h5>
               </div>
            </div>`
        default:
            break;
    }
}

// ---------------
// Copy Function
// ---------------

// $(document).ready(function(){
//     $(".show-toast").click(function(){
//         $("#myToast").toast({ delay: 3000 });
//         $("#myToast").toast('show');
//     }); 
// });


// dark-mode
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
  

function copyString(url) {

    $("#myToast").toast({ delay: 3000 });
    $("#myToast").toast('show');

    // console.log(url);

    var dummy = document.createElement("textarea");
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    dummy.value = url;
    /* Get the text field */

    /* Select the text field */
    dummy.select();
    dummy.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
    document.body.removeChild(dummy);

    /* Alert the copied text */
    // alert("Copied");
     
}


// ----------
// Samehadaku
// ----------

function show_element_download(url, elementid, hostingname){
    var hosting = document.createElement('a');
    hosting.classList.add("btn", "btn-primary", "down-button", "show-toast")
    hosting.setAttribute('href', "#")
    hosting.setAttribute("onclick", "copyString('" + url + "')")
    hosting.innerHTML = hostingname
    document.getElementById(elementid).appendChild(hosting);
}

function smhd_downloads(url) {
    var backbtn = document.getElementById("back_btn")
    backbtn.innerHTML = ``
    backbtn.innerHTML = `<button onclick="back_page('samehadaku')" class="btn btn-secondary" title="Back>">Back</button>`
    $("#back_btn").show();
    $("#smhd_progressBar").show();
    $("#smhd_imgcnt").hide();

    $("#smhd_descriptionBox").show();

    var ajaxRequest;
    try {
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        alert("Server could not be reached. Restart Neuron");
        return false;
    }
    // Create a function that will receive data sent from the server

    ajaxRequest.onreadystatechange = function () {
        $("#smhd_progressBar").show();

        if (ajaxRequest.readyState == 4) {

            // Get the data from the server's response
            var data = ajaxRequest.responseText;
            console.log(JSON.parse(data))
            data = JSON.parse(data);

            $("#smhd_title").text(data.title)
            var imgOption = document.createElement('div');
            imgOption.innerHTML = `<img src="` + data.img + `">`
            // newOption.innerHTML = "<p>"+response[i]+"</p><br>";
            document.getElementById("smhd_imgdesc").appendChild(imgOption);
            

            var descriptionOption = document.createElement('p');
            descriptionOption.classList.add('text-left')
            descriptionOption.innerHTML = data.description
            // newOption.innerHTML = "<p>"+response[i]+"</p><br>";
            document.getElementById("smhd_description").appendChild(descriptionOption);

            var b;
            // h264 360p
            for (b = 0; b< data.h264_360.length; b++){
                switch (true) {
                    case (String(data.h264_360[b]).indexOf("acefile") > -1):
                        show_element_download(data.h264_360[b], "smhd_h264_360", 'Acefile')
                        break;
                    case (String(data.h264_360[b]).indexOf("zippyshare") > -1):
                        show_element_download(data.h264_360[b], "smhd_h264_360", 'Zippyshare')
                        break;
                    case (String(data.h264_360[b]).indexOf("reupload") > -1):
                        show_element_download(data.h264_360[b], "smhd_h264_360", 'Reupload')
                        break;
                    case (String(data.h264_360[b]).indexOf("mediafire") > -1):
                        show_element_download(data.h264_360[b], "smhd_h264_360", 'Mediafire')
                        break;
                    default:
                        break;
                }
            }

            for (b = 0; b< data.h264_480.length; b++){
                switch (true) {
                    case (String(data.h264_480[b]).indexOf("acefile") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_480", 'Acefile')
                        break;
                    case (String(data.h264_480[b]).indexOf("zippyshare") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_480", 'Zippyshare')
                        break;
                    case (String(data.h264_480[b]).indexOf("reupload") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_480", 'Reupload')
                        break;
                    case (String(data.h264_480[b]).indexOf("mediafire") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_480", 'Mediafire')
                        break;
                    default:
                        break;
                }
            }

            for (b = 0; b< data.h264_720.length; b++){
                switch (true) {
                    case (String(data.h264_720[b]).indexOf("acefile") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_720", 'Acefile')
                        break;
                    case (String(data.h264_720[b]).indexOf("zippyshare") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_720", 'Zippyshare')
                        break;
                    case (String(data.h264_720[b]).indexOf("reupload") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_720", 'Reupload')
                        break;
                    case (String(data.h264_720[b]).indexOf("mediafire") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_720", 'Mediafire')
                        break;
                    default:
                        break;
                }
            }

            for (b = 0; b< data.h264_1080.length; b++){
                switch (true) {
                    case (String(data.h264_1080[b]).indexOf("acefile") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_1080", 'Acefile')
                        break;
                    case (String(data.h264_1080[b]).indexOf("zippyshare") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_1080", 'Zippyshare')
                        break;
                    case (String(data.h264_1080[b]).indexOf("reupload") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_1080", 'Reupload')
                        break;
                    case (String(data.h264_1080[b]).indexOf("mediafire") > -1):
                        show_element_download(data.h264_480[b], "smhd_h264_1080", 'Mediafire')
                        break;
                    default:
                        break;
                }
            }

            for (b = 0; b< data.h265_480.length; b++){
                switch (true) {
                    case (String(data.h265_480[b]).indexOf("acefile") > -1):
                        show_element_download(data.h264_480[b], "smhd_h265_480", 'Acefile')
                        break;
                    case (String(data.h265_480[b]).indexOf("zippyshare") > -1):
                        show_element_download(data.h264_480[b], "smhd_h265_480", 'Zippyshare')
                        break;
                    case (String(data.h265_480[b]).indexOf("reupload") > -1):
                        show_element_download(data.h264_480[b], "smhd_h265_480", 'Reupload')
                        break;
                    case (String(data.h265_480[b]).indexOf("mediafire") > -1):
                        show_element_download(data.h264_480[b], "smhd_h265_480", 'Mediafire')
                        break;
                    default:
                        break;
                }
            }

            for (b = 0; b< data.h265_720.length; b++){
                switch (true) {
                    case (String(data.h265_720[b]).indexOf("acefile") > -1):
                        show_element_download(data.h264_480[b], "smhd_h265_720", 'Acefile')
                        break;
                    case (String(data.h265_720[b]).indexOf("zippyshare") > -1):
                        show_element_download(data.h264_480[b], "smhd_h265_720", 'Zippyshare')
                        break;
                    case (String(data.h265_720[b]).indexOf("reupload") > -1):
                        show_element_download(data.h264_480[b], "smhd_h265_720", 'Reupload')
                        break;
                    case (String(data.h265_720[b]).indexOf("mediafire") > -1):
                        show_element_download(data.h264_480[b], "smhd_h265_720", 'Mediafire')
                        break;
                    default:
                        break;
                }
            }

            $("#smhd_h264_360").show();
            $("#smhd_h264_480").show();
            $("#smhd_h264_720").show();
            $("#smhd_h264_1080").show();
            $("#smhd_h265_480").show();
            $("#smhd_h265_720").show();

        }
        $("#smhd_progressBar").hide();
        // document.getElementById("progressbar").removeChild(progressbar);
        //$('#successAlert').show();
    }
    ajaxRequest.open("POST", "/get_samehadaku_dl/", true);
    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxRequest.send("url=" + url);
}

function get_samehadaku(page) {

    if ($("#anitoki").is(":visible")) {
        $("#anitoki").hide()
        $("#samehadaku").show()
        $("#nav_anitoki").removeClass("active")
        $("#nav_samehadaku").addClass("active")
    }
    if ($('#smhd_imgcnt [class="col-sm-auto"]').length) {
        console.log("Sudah ada childnya")
        return false
    }
    var ajaxRequest;
    try {
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        alert("Server could not be reached. Restart Neuron");
        return false;
    }
    // Create a function that will receive data sent from the server

    ajaxRequest.onreadystatechange = function () {
        $("#smhd_progressBar").show();
        if (ajaxRequest.readyState == 4) {

            // Get the data from the server's response
            var data = ajaxRequest.responseText;
            console.log(JSON.parse(data))
            data = JSON.parse(data);

            var i;

            for (i = 0; i < data.judul.length; i++) {
                // console.log(response[i])
                newOption = document.createElement('div');
                newOption.innerHTML = `
            <div class="col-sm-auto">
              <div class="card card2" style="width: 18rem;">
                <img class="card-img-top" src="` + data.thumb[i] + `" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">` + data.judul[i] + `</h5>
                  <p class="card-text">`+ data.release[i] +`</p>
                  <a href="#" id=` + i + ` class="btn btn-primary" onclick="smhd_downloads('` + data.link[i] + `')">Download</a>
                </div>
              </div>
            </div>`
                // newOption.innerHTML = "<p>"+response[i]+"</p><br>";
                document.getElementById("smhd_imgcnt").appendChild(newOption);


            }
            $("#smhd_progressBar").hide();
            // document.getElementById("progressbar").removeChild(progressbar);
            //$('#successAlert').show();
        }
    }
    ajaxRequest.open("POST", "/get_samehadaku/", true);
    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxRequest.send("page=" + page);
}


// Anitoki
function downloads(url) {
    var backbtn = document.getElementById("back_btn")
    backbtn.innerHTML = ``
    backbtn.innerHTML = `<button onclick="back_page('anitoki')" class="btn btn-secondary" title="Back>">Back</button>`
    $("#back_btn").show();
    $("#progressBar").show();
    $("#imgcnt").hide();

    $("#descriptionBox").show();

    var ajaxRequest;
    try {
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        alert("Server could not be reached. Restart Neuron");
        return false;
    }
    // Create a function that will receive data sent from the server

    ajaxRequest.onreadystatechange = function () {
        $("#progressBar").show();

        if (ajaxRequest.readyState == 4) {

            // Get the data from the server's response
            var data = ajaxRequest.responseText;
            console.log(JSON.parse(data))
            data = JSON.parse(data);

            $("#title").text(data.title)
            var imgOption = document.createElement('div');
            imgOption.innerHTML = `<img src="` + data.img + `">`
            // newOption.innerHTML = "<p>"+response[i]+"</p><br>";
            document.getElementById("imgdesc").appendChild(imgOption);

            var a;

            for (a = 0; a < data.description.length; a++) {
                // console.log(response[i])
                var descriptionOption = document.createElement('p');
                descriptionOption.classList.add('text-left')
                descriptionOption.innerHTML = data.description[a]
                // newOption.innerHTML = "<p>"+response[i]+"</p><br>";
                document.getElementById("description").appendChild(descriptionOption);


            }
            console.log(data)
            var b;
            // h264 360p


            for (b = 0; b < data.h264_360.length; b++) {
                if (String(data.h264_360[b]).indexOf("google") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_360[b] + "')")
                    gdrive.innerHTML = `Google Drive`
                    document.getElementById("h264_360").appendChild(gdrive);
                }
                if (String(data.h264_360[b]).indexOf("zippyshare") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_360[b] + "')")
                    gdrive.innerHTML = `ZippyShare`
                    document.getElementById("h264_360").appendChild(gdrive);
                }
                if (String(data.h264_360[b]).indexOf("clicknupload") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_360[b] + "')")
                    gdrive.innerHTML = `ClicknUpload`
                    document.getElementById("h264_360").appendChild(gdrive);
                }
                if (String(data.h264_360[b]).indexOf("racaty") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_360[b] + "')")
                    gdrive.innerHTML = `Racaty`
                    document.getElementById("h264_360").appendChild(gdrive);
                }
                if (String(data.h264_360[b]).indexOf("mir.cr") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_360[b] + "')")
                    gdrive.innerHTML = `Mirror`
                    document.getElementById("h264_360").appendChild(gdrive);
                }
            }

            // h264 480p 
            for (b = 0; b < data.h264_480.length; b++) {
                if (String(data.h264_480[b]).indexOf("google") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_480[b] + "')")
                    gdrive.innerHTML = `Google Drive`
                    document.getElementById("h264_480").appendChild(gdrive);
                }
                if (String(data.h264_480[b]).indexOf("zippyshare") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_480[b] + "')")
                    gdrive.innerHTML = `ZippyShare`
                    document.getElementById("h264_480").appendChild(gdrive);
                }
                if (String(data.h264_480[b]).indexOf("clicknupload") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_480[b] + "')")
                    gdrive.innerHTML = `ClicknUpload`
                    document.getElementById("h264_480").appendChild(gdrive);
                }
                if (String(data.h264_480[b]).indexOf("racaty") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_480[b] + "')")
                    gdrive.innerHTML = `Racaty`
                    document.getElementById("h264_480").appendChild(gdrive);
                }
                if (String(data.h264_480[b]).indexOf("mir.cr") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_480[b] + "')")
                    gdrive.innerHTML = `Mirror`
                    document.getElementById("h264_480").appendChild(gdrive);
                }
            }

            // h264 720p 
            for (b = 0; b < data.h264_720.length; b++) {
                if (String(data.h264_720[b]).indexOf("google") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_720[b] + "')")
                    gdrive.innerHTML = `Google Drive`
                    document.getElementById("h264_720").appendChild(gdrive);
                }
                if (String(data.h264_720[b]).indexOf("zippyshare") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_720[b] + "')")
                    gdrive.innerHTML = `ZippyShare`
                    document.getElementById("h264_720").appendChild(gdrive);
                }
                if (String(data.h264_720[b]).indexOf("clicknupload") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_720[b] + "')")
                    gdrive.innerHTML = `ClicknUpload`
                    document.getElementById("h264_720").appendChild(gdrive);
                }
                if (String(data.h264_720[b]).indexOf("racaty") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_720[b] + "')")
                    gdrive.innerHTML = `Racaty`
                    document.getElementById("h264_720").appendChild(gdrive);
                }
                if (String(data.h264_720[b]).indexOf("mir.cr") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_720[b] + "')")
                    gdrive.innerHTML = `Mirror`
                    document.getElementById("h264_720").appendChild(gdrive);
                }
            }

            // h264 1080p 
            for (b = 0; b < data.h264_1080.length; b++) {
                if (String(data.h264_1080[b]).indexOf("google") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_1080[b] + "')")
                    gdrive.innerHTML = `Google Drive`
                    document.getElementById("h264_1080").appendChild(gdrive);
                }
                if (String(data.h264_1080[b]).indexOf("zippyshare") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_1080[b] + "')")
                    gdrive.innerHTML = `ZippyShare`
                    document.getElementById("h264_1080").appendChild(gdrive);
                }
                if (String(data.h264_1080[b]).indexOf("clicknupload") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_1080[b] + "')")
                    gdrive.innerHTML = `ClicknUpload`
                    document.getElementById("h264_1080").appendChild(gdrive);
                }
                if (String(data.h264_1080[b]).indexOf("racaty") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_1080[b] + "')")
                    gdrive.innerHTML = `Racaty`
                    document.getElementById("h264_1080").appendChild(gdrive);
                }
                if (String(data.h264_1080[b]).indexOf("mir.cr") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h264_1080[b] + "')")
                    gdrive.innerHTML = `Mirror`
                    document.getElementById("h264_1080").appendChild(gdrive);
                }
            }

            // h265 480p 
            for (b = 0; b < data.h265_480.length; b++) {
                if (String(data.h265_480[b]).indexOf("google") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h265_480[b] + "')")
                    gdrive.innerHTML = `Google Drive`
                    document.getElementById("h265_480").appendChild(gdrive);
                }
                if (String(data.h265_480[b]).indexOf("zippyshare") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h265_480[b] + "')")
                    gdrive.innerHTML = `ZippyShare`
                    document.getElementById("h265_480").appendChild(gdrive);
                }
                if (String(data.h265_480[b]).indexOf("mir.cr") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h265_480[b] + "')")
                    gdrive.innerHTML = `Mirror`
                    document.getElementById("h265_480").appendChild(gdrive);
                }
            }

            // h265 720p 
            for (b = 0; b < data.h265_720.length; b++) {
                if (String(data.h265_720[b]).indexOf("google") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h265_720[b] + "')")
                    gdrive.innerHTML = `Google Drive`
                    document.getElementById("h265_720").appendChild(gdrive);
                }
                if (String(data.h265_720[b]).indexOf("zippyshare") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h265_720[b] + "')")
                    gdrive.innerHTML = `ZippyShare`
                    document.getElementById("h265_720").appendChild(gdrive);
                }
                if (String(data.h265_720[b]).indexOf("mir.cr") > -1) {

                    var gdrive = document.createElement('a');
                    gdrive.classList.add("btn")
                    gdrive.classList.add("btn-primary")
                    gdrive.classList.add("down-button")
                    gdrive.setAttribute('href', "#")
                    gdrive.setAttribute("onclick", "copyString('" + data.h265_720[b] + "')")
                    gdrive.innerHTML = `Mirror`
                    document.getElementById("h265_720").appendChild(gdrive);
                }
            }


            $("#h264_360").show();
            $("#h264_480").show();
            $("#h264_720").show();
            $("#h264_1080").show();
            $("#h265_480").show();
            $("#h265_720").show();

        }
        $("#progressBar").hide();
        // document.getElementById("progressbar").removeChild(progressbar);
        //$('#successAlert').show();
    }
    ajaxRequest.open("POST", "/get_download/", true);
    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxRequest.send("url=" + url);
}

function get_image(page) {
    if ($("#samehadaku").is(":visible")) {
        $("#samehadaku").hide();
        $("#anitoki").show();
        $("#nav_anitoki").addClass("active")
        $("#nav_samehadaku").removeClass("active")
    }
    if ($('#imgcnt [class="col-sm-auto"]').length) {
        console.log("Sudah ada childnya")
        return false
    }

    $("#descriptionBox").hide();
    $("#progressBar").hide();
    var ajaxRequest;
    try {
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        alert("Server could not be reached. Restart Neuron");
        return false;
    }
    // Create a function that will receive data sent from the server

    ajaxRequest.onreadystatechange = function () {
        $("#progressBar").show();
        if (ajaxRequest.readyState == 4) {

            // Get the data from the server's response
            var data = ajaxRequest.responseText;
            console.log(JSON.parse(data))
            data = JSON.parse(data);

            var i;

            for (i = 0; i < data.judul.length; i++) {
                // console.log(response[i])
                newOption = document.createElement('div');
                newOption.innerHTML = `
            <div class="col-sm-auto">
              <div class="card card2" style="width: 18rem;">
                <img class="card-img-top" src="` + data.thumb[i] + `" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">` + data.judul[i] + `</h5>
                  <p class="card-text">`+ data.release[i] +`</p>
                  <a href="#" id=` + i + ` class="btn btn-primary" onclick="downloads('` + data.link[i] + `')">Download</a>
                </div>
              </div>
            </div>`
                // newOption.innerHTML = "<p>"+response[i]+"</p><br>";
                document.getElementById("imgcnt").appendChild(newOption);


            }
            $("#progressBar").hide();
            // document.getElementById("progressbar").removeChild(progressbar);
            //$('#successAlert').show();
        }

    }
    ajaxRequest.open("POST", "/get_data/", true);
    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxRequest.send("page=" + page);

}