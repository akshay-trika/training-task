import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-apollo';
import createDocument from "../../graphql/postContact.graphql";
import uploadFile from '../../graphql/uploadFile.graphql';
import ReCAPTCHA from "react-google-recaptcha";


const ContactUsForm = () => {
    const [uploadfile] = useState('')
    const captchaRef = useRef(null)
    const [token, setToken] = useState('')
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        subject: "",
        uploadfile: "",
        email: "",
        message: "",
        age: ""
    });
    const [sitek, setSitekey] = useState('')
    const [save] = useMutation(createDocument)
    const [uploadfle] = useMutation(uploadFile)


    useEffect(() => {
        fetchUserData()
        fetchCaptcha()
    }, [])


    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setState((prevProps) => ({
            ...prevProps, [name]: value
        }))
    };




    const fetchUserData = async () => {
        const res = await fetch('/contact')
        console.log(res);

    }


    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target as any;
        const { data } = await uploadfle({
            variables: { file: files[0] },
        })
        setState(
            {
                ...state, uploadfile: data.uploadFile.fileUrl
            }
        )
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const object: any = {
            fields: Object.keys(state).map((key: string) => ({ key, value: state[key as keyof typeof state] }))
        }
        try {
            const data = save({
                variables: {
                    document: object,
                    schema: 'AkContactSchema',
                    dataEntity: "AkshyContact",
                    account: "trika",
                    acronym: "YF"
                }
            })
            if (data !== undefined) {
                setState({
                    firstname: "",
                    lastname: "",
                    subject: "",
                    uploadfile: "",
                    email: "",
                    message: "",
                    age: ""
                })
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleRecaptchaChange = (value: any) => {
        if (value) {
            setToken(value)
        }
    };

    // useEffect(() => {
    //     fetchCaptcha()
    // }, [])

    const fetchCaptcha = async () => {
        const res = await fetch('/captcha')
        if (res.ok) {
            const response = await res.json()

            if (response.sitekey.length) {
                setSitekey(response.sitekey)
            }

        }
    }





    return (
        <article className="pa4 black-80">
            <form action="sign-up_submit" className='flex justify-center' onSubmit={handleSubmit}>
                <fieldset id="sign_up" className="ba-m ma5 mh0 pa4 ph0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="flex justify-between">
                        <div className="mt3 mr4">
                            <label className="db fw4 lh-copy f6" htmlFor="firstname">First Name</label>
                            <input className="pa2 input-reset ba bg-transparent w-100  measure br4" type="text" name="firstname" id="firstname"
                                value={state.firstname}
                                onChange={handleInputChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="lastname" >Last Name</label>
                            <input className="pa2 input-reset ba bg-transparent w-100  measure br4"
                                value={state.lastname}
                                onChange={handleInputChange}
                                type="text" name="lastname" id="lastname" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mt3 mr4">
                            <label className="db fw4 lh-copy f6" htmlFor="age">Age</label>
                            <input className="pa2 input-reset ba bg-transparent w-100  measure br4" type="text" name="age" id="age"
                                value={state.age}
                                onChange={handleInputChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="email">Email</label>
                            <input className="pa2 input-reset ba bg-transparent w-100  measure br4" type="text" name="email" id="email"
                                value={state.email}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mt3 mr4">
                            <label className="db fw4 lh-copy f6" htmlFor="subject">Subject</label>
                            <input className="pa2 input-reset ba bg-transparent w-100  measure br4" type="text" name="subject" id="subject" value={state.subject}
                                onChange={handleInputChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="message">Message</label>
                            <input className="pa2 input-reset ba bg-transparent w-100  measure br4" type="text" name="message" id="message" value={state.message}
                                onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="uploadfile">Upload file</label>
                        <input className="pa2 input-reset bg-transparent w-100 " type="file" name="uploadfile" id="uploadfile" value={uploadfile}
                            onChange={(e) => { handleFileChange(e) }} />
                    </div>
                    <div className="mt3">
                        {sitek.length && <ReCAPTCHA onChange={(e) => { handleRecaptchaChange(e) }}
                            sitekey={sitek}
                            ref={captchaRef}
                        />}
                    </div>
                    <div className="mt3 tc"><input className="b ph3 pv2 input-reset ba b--black bg-transparent br4 grow pointer f6" type="submit" value="submit" disabled={!token && !token.length} /></div>

                </fieldset>
            </form>
        </article>
    )

};



export default ContactUsForm;