export const  getData = async (url) => {
   const request = await fetch(`${url}`,{
      method: 'GET',
      
   })
   const data = request.json();
   
   return data;
}