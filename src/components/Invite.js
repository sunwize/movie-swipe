
import { useState } from "react";
import styled from "styled-components";

const Invite = () =>{
    const [showForm, setShowForm] = useState('noShow');
    const [emailList, setEmailList] = useState([]);
    const [email, setEmail] = useState('maya@gmail.com');

    const addEmail = (event) => {
        event.preventDefault();

        setEmailList((arr) => [...arr, email]);
        setEmail('');
        setShowForm('noShow');

    }

    return(
        <Wrapper>
            <h3>Let's send out some invites!</h3>
            <div className="adding">
                {emailList.map((element, i) => {
                    return<div key={i} className="invited"><h3 className="letter">{element.at(0)}</h3></div>
                })}
                <div className="addBtnParent" onClick={() => setShowForm('show')}><h3 className="addBtn"> + </h3></div>
                <div className="addEmail">
                    <form onSubmit={addEmail} className={showForm === 'noShow'? 'noDisplay':'yesDisplay'}>
                        <input type={"email"} 
                            placeholder={"example@email.com"} 
                            value={email} 
                            onChange={event=>setEmail(event.target.value)}/>
                        <button>Add</button>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
    width: auto;
    
    .adding{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }
    .addBtnParent, .invited{
        width: 2rem;
        height: 2rem;
        display: flex;
        border: 1px black solid;
        border-radius: 1rem;
    }
    .addBtn, .letter {
    margin: auto;
    text-align: center;
    }
    .letter{
        text-transform: uppercase;
    }
    .noDisplay{
        display: none;
    }
    .yesDisplay{
        display: block;
    }
    input{
        font-size: var(--subheader-font-size);
    }
    
` 
export default Invite;