import React from 'react'
import style from "./FooterDesktop.css"

interface FooterProps {

}

const FooterDesktop: StorefrontFunctionComponent<FooterProps> = (props) => {
    console.log(props)
    const footerSectionItems = [
        {
            title: "Shop",
            items: ["Jewelry", "Fashion", "Music", "For Your Home"]
        },
        { title: "About", items: ["Our Story", "Press", "Contact US"] },
        { title: "Help", items: ["FAQ's", "Return & Refund"] }
    ]

    return (<div>
        <div className={`${style.title}`}>
            {
                footerSectionItems.map(ele => (
                    <div >
                        <b>{ele.title}</b>
                        <div>
                            {ele.items.map(menu => (
                                <p>{menu}</p>
                            ))}
                        </div>
                    </div>

                ))

            }
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
                    url: '#'
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