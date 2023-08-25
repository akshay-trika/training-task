import React from 'react'

interface FooterProps {

}

const FooterDesktop: StorefrontFunctionComponent<FooterProps> = (props: any) => {
    const footerSectionItems = [
        {
            title: "Shop",
            items: props.shopLinks ? props.shopLinks : []
        },
        { title: "About", items: props.aboutLinks ? props.aboutLinks : [] },
        { title: "Help", items: props.helpLinks ? props.helpLinks : [] }
    ]
    console.log(footerSectionItems);

    return (<div>
        <div className={`flex justify-between ph7 pt4`}>
            {
                footerSectionItems.map(ele => (
                    <div key={ele.title} >
                        <b>{ele.title}</b>
                        <div>
                            {ele.items.length && ele.items.map((menu: any) => (
                                <p key={menu.text}>{menu.text}</p>
                            ))}
                        </div>
                    </div>

                ))

            }
        </div>
        <div className={`flex justify-between ph7 pt3`}>
            <div className="flex flex-column">
                <p className='b '>Sign up to receive the project antelope newsletter</p>
                <input type='email' className="ba bw1 b--black-20 bg-white pa2 br-pill outline-0 w-300 placeholder-black fw4 pl1" placeholder='Enter your email address' />
               <div className="relative">
               <div className="absolute pt3 top--2 right-1"> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                </div>
               </div>
            </div>
            <div className="">
                <p className={`f4 fw6 b flex justify-end`}>Connect with us</p>
                <div className=' flex justify-end'>
                    <div className='ph3'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                    </div>
                    <div className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 320 512">
                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                    </div>
                </div>
                <div className='f4 fw6 b flex justify-end'>
                    <p className='mh2'>Terms of use</p>
                    <p className='mh2'> Privacy policy</p>
                    <p className='mh2'>All rights reserved </p>
                </div>
            </div>
        </div>

    </div>)
}

FooterDesktop.schema = {
    title: 'Footer Desktop',
    type: 'object',
    properties: {
        shopLinks: {
            title: 'Shop',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    text: {
                        title: 'Link Text',
                        type: 'string'
                    },
                    url: {
                        title: 'Link URL',
                        type: 'string'
                    }
                }
            },
            default: [
                {
                    text: 'Our Artists',
                    url: '# amit'
                },
                {
                    text: 'Jewelry',
                    url: '#'
                },
                {
                    text: 'Fashion',
                    url: '#'
                },
                {
                    text: 'Music',
                    url: '#'
                },
                {
                    text: 'Literature',
                    url: '#'
                },
                {
                    text: 'For Your Home',
                    url: '#'
                }
            ]
        },
        aboutLinks: {
            title: 'About',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    text: {
                        title: 'Link Text',
                        type: 'string'
                    },
                    url: {
                        title: 'Link URL',
                        type: 'string'
                    }
                }
            },
            default: [
                {
                    text: 'Our Story',
                    url: '#'
                },
                {
                    text: 'Press',
                    url: '#'
                },
                {
                    text: 'Contact Us',
                    url: '/contact-us'
                }
            ]
        },
        helpLinks: {
            title: 'Help',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    text: {
                        title: 'Link Text',
                        type: 'string'
                    },
                    url: {
                        title: 'Link URL',
                        type: 'string'
                    }
                }
            }
        }
    }
}

export default FooterDesktop;