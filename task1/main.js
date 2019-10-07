//global variable
var countries;

//creat api request
fetch("https://countriesnode.herokuapp.com/v1/countries/")
.then(res => res.json())
.then(data => initializa(data))
.catch(err => console.log(err));

function initializa(data){
    countries = data;
    countries.forEach(country => country.name);
    //console.log(countries);
    return countries;
}

//creat router obgect
var Router = [
    {
        path : '/',
        name : 'Root'
    },
    {
        path : '/countrieslist',
        name : 'countries'
    },
    {
        path : '/countrieslist/country',
        name : 'country'
    }   
        
];
//console.log(Router.length);

var home = document.getElementById('home');
var activeRoute = Array.from(document.querySelectorAll('[router]'));


function displayCountryInfo(event){
    var countrycode = event.target.attributes.value.nodeValue;
    var routeInfo = Router.filter(function(route){
        return route.path ==='/countrieslist/country';
       })[0];
    window.history.pushState({}, "", routeInfo.path);  

    const countrydata = countries.find(data => data.code === countrycode);
    console.log('okkk');
    console.log(countrydata);
    home.innerHTML = `<p>Currency : ${countrydata.currency}</p>
                     <p>Phone : ${countrydata.phone}</p>`;
};

//console.log(activeRoute);



//Routing Function
function navigate(event){
   var rr = event.target.attributes[0].value;
   
   var routeInfo = Router.filter(function(route){
     return route.path === rr;
    })[0];

    if(routeInfo){
        window.history.pushState({}, "", routeInfo.path);
        
        
        if(routeInfo.path === '/'){
            home.innerHTML = `<h1>I am home</h1>`;
        }
        if(routeInfo.path === '/countrieslist'){
            var countryinfo = countries;
            var rr = "";
            var allData = "";
            countryinfo.forEach(info => {
                allData +=`<h4 value ="${info.code}">${info.name}------${info.languages}/${info.native}</h4>` ;
            });
            home.innerHTML = allData;
            
            
            //EventListener For Li
            home.childNodes.forEach(function(){
                addEventListener('click', displayCountryInfo, false);
            });

            
        }

    }else{
        home.innerHTML = 'no route match'; 
       
    }
}




//route event listener
activeRoute.forEach(function(){
    addEventListener('click', navigate, false);
});
 
