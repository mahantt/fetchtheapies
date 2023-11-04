const fs=require("fs")
// const myArr=[]
fs.readFile("input.txt","utf-8",(err,file)=>{
    if(err){
        console.log(err);
    }else{
        let lines= file.split('\n')
        lines.forEach((adress,index) => {
            fetch(adress).then((response)=>{
                if(response.status !==200){
                    throw new Error("response nyomad")
                }
                const contentType= response.headers.get("content-type");
                if(contentType && contentType.indexOf(("application/json") !==-1)) {
                    return response.json()
                }else if (contentType && contentType.indexOf(("html.txt") !==-1)){
                    return response.text()
                }else{
                    throw new Error("just json or html")
                }
                }).then((data)=>{
                    fs.writeFile(`data${index + 1}.json`, JSON.stringify(data,null,2), (err) => {
                        if (err){
                            throw new Error("an Error has occured while writing the file!")
                        }
                    })
                })
            })
            
        };

    }
)
       



