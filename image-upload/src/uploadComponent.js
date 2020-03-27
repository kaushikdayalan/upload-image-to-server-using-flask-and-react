import React from 'react'

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageUrl:"",
            response:""
        }
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }
    handleUploadImage(event){
        event.preventDefault();
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('fileName', this.fileName.value);
        fetch(" http://127.0.0.1:5000/upload",{
            method:"POST",
            body: data
        })
        .then(response =>{
            response.json().then(body=>{

                this.setState({imageUrl: `http://0.0.0.0:5000/${body.file}`,response:response.response})
            });
        });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleUploadImage}>
                    <div>
                        <input ref={(ref)=>{this.uploadInput = ref;}} type="file"></input>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <input ref={(ref)=>{this.fileName = ref;}} type="text" placeholder="Enter the desired name of file"></input>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <button>upload</button>
                    </div>
                    <br/>
                    <br/>
                    <img src={this.state.imageUrl} alt="not yet uploaded"/>
                    <br/>
                    <br/>
                        <h1>{this.state.response}</h1>
                </form>
            </div>
        )
    }
}

export default  Main;