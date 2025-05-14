const key ="dd6613219cd440a89f1ec39f2cc899e5"
document.addEventListener("DOMContentLoaded",function(){
    document.getElementsByClassName("data-container")[1].style.display="none"
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          var requestOptions = {
              method: 'GET',
            };
            
            fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${key}`, requestOptions)
              .then(response => response.json())
              .then(result =>{
                console.log(result);
                const {features}=result
                const [data] =features;
                let {name,offset_STD,offset_STD_seconds,
                    offset_DST,offset_DST_seconds
                } = data.properties.timezone;
                let {country,city,postcode}=data.properties;
                document.querySelector(".name-time-zone").innerText+=name
                document.querySelector(".lat").innerText+=latitude
                document.querySelector(".lan").innerText+=longitude
                document.querySelector(".offset-std").innerText+=offset_STD
                document.querySelector(".offset-std-seconds").innerText+=offset_STD_seconds
                document.querySelector(".offset-dst").innerText+=offset_DST
                document.querySelector(".offset-dst-seconds").innerText+=offset_DST_seconds
                document.querySelector(".country").innerText+=country
                document.querySelector(".postcode").innerText+=postcode
                document.querySelector(".city").innerText+=city


              })
              .catch(error => console.log('error', error));
        },
        function (error) {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  
})
function searchAddress(){
    var inputText = document.getElementById("address").value.trim();
    if(!inputText){
        document.querySelector(".error-message").innerText="Please enter an address"
        return
    }
    document.querySelector(".error-message").innerText="";
    var requestOptions = {
        method: 'GET',
      };
      
           document.getElementsByClassName("data-container")[1].style.display="none"
      fetch(`https://api.geoapify.com/v1/geocode/search?text=${inputText}&apiKey=${key}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            
                const {features}=result
                const [data] =features;
                let {name,offset_STD,offset_STD_seconds,
                    offset_DST,offset_DST_seconds
                } = data.properties.timezone;
                let {country,city,postcode,lat,lon}=data.properties;
                document.getElementsByClassName("name-time-zone")[1].innerText+=name
                document.getElementsByClassName("lat")[1].innerText+=lat
                document.getElementsByClassName("lan")[1].innerText+=lon
                document.getElementsByClassName("offset-std")[1].innerText+=offset_STD
                document.getElementsByClassName("offset-std-seconds")[1].innerText+=offset_STD_seconds
                document.getElementsByClassName("offset-dst")[1].innerText+=offset_DST
                document.getElementsByClassName("offset-dst-seconds")[1].innerText+=offset_DST_seconds
                document.getElementsByClassName("country")[1].innerText+=country
                document.getElementsByClassName("postcode")[1].innerText+=postcode??'N.A'
                document.getElementsByClassName("city")[1].innerText+=city
                document.getElementsByClassName("data-container")[1].style.display="flex"
                document.getElementsByClassName("data-container")[1].style.border="1px solid white"
                document.getElementsByClassName("data-container")[1].style.marginBottom="10px"
        })
        .catch(error =>{
            console.log(error,"errrr")
            document.querySelector(".error-message").innerText="Invalid Address";
        });
}