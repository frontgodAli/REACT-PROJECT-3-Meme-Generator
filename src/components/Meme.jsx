import { useEffect, useState } from "react"


function Meme(){

    const [meme,setMeme] = useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes,setAllMemes]=useState([])

    useEffect(()=> {
        async function getMemesFromApi(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data= await res.json()
            setAllMemes(data)
        }
        getMemesFromApi()
        
    },[])


    function getMeme(){

        const memesArray=allMemes.data.memes
        const randomIndex=Math.floor(Math.random()*memesArray.length)
        setMeme(prev =>({
            ...prev,
            randomImage:memesArray[randomIndex].url
        }))
    }

    function handleChange(event){
        const {name,value}=event.target
        setMeme(prev =>({
            ...prev,
            [name]:value
        }))
    }

    function handleSubmit(event){
        event.preventDefault()
    }

    return(
        <main>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" id="top-text" name="topText" placeholder="Top text" value={meme.topText} onChange={handleChange}/>
                <input type="text" id="bottom-text" name="bottomText" placeholder="Bottom text" value={meme.bottomText} onChange={handleChange}/>
                <button onClick={getMeme} className="new-meme-btn" type="submit" id="new-meme">Get a new meme image  🖼</button>
            </form>
                <div className="img-container">
                    <img className="meme-img" src={meme.randomImage} />
                    <h1 className="input-text top">{meme.topText}</h1>
                    <h1 className="input-text bottom">{meme.bottomText}</h1>
                </div>
                
        </main>
        
    )

}
export default Meme