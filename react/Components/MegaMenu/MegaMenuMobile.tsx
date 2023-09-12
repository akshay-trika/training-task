import React, { useEffect, useState } from "react";
import { FaBars, FaAngleRight, FaAngleLeft } from 'react-icons/fa';

interface MegaMenuMobileProps { }

const MegaMenuMobile: StorefrontFunctionComponent<MegaMenuMobileProps> = (props: any) => {
    const [show, setShow] = useState(false)
    const [firstMenu, setFirstMenu] = useState<any | undefined>();
    const [firstMenuTrue, setFirstMenuTrue] = useState(false)
    const [firstTitle, setFirstTitle] = useState('')
    const [secondTitle, setSecondTitle] = useState('')

    const [secondMenu, setSecondMenu] = useState<any>()
    const [secondMenuTrue, setSecondMenuTrue] = useState(false)
    const [index, setIndex] = useState(-1)
    const [secIndex, setSecIndex] = useState(-1)

    const [thirdMenu, setThirdMenu] = useState<any>()
    const [thirdMenuTrue, setThirdMenuTrue] = useState(false)
    console.log(secondMenu);



    useEffect(() => {
        setFirstMenu(props.megamenu1)

    }, [props.megamenu1])


    const handleFirstMenuClick = (i: number, secondLevel: { displayMenu: string; secondLevelSubmenu: { subMenuTitle: string; href: string; }[]; }[], firstTitle: any) => {
        setFirstTitle(firstTitle)
        if (index === i) {
            setIndex(-1);
        } else {
            setIndex(i);
            setSecondMenu(secondLevel)
            setSecondMenuTrue(true)
            setFirstMenuTrue(false)

        }
    }

    const handleSecondMenuClick = (i: number, thirdlevel: { subMenuTitle: string; href: string; }[], title: any) => {
        setSecondTitle(title)
        if (secIndex === i) {
            setSecIndex(-1);
            setThirdMenu(null)

        } else {
            if (thirdlevel) {
                setThirdMenu(thirdlevel)
                setThirdMenuTrue(true)
                setSecIndex(i);
                setSecondMenuTrue(false)
            }


        }
    }

    function handleMenuClick(str:string) {
        if(str == "firstLevelOpen"){
            setShow(true)
            setSecondMenuTrue(false)
            setFirstTitle('')
            setFirstMenuTrue(true)
        }

        if(str == "firstLevelClose"){
            if (thirdMenuTrue) {
                setThirdMenuTrue(false)
                setSecondMenuTrue(true)
                setShow(true)
                setSecondTitle('')
            }

            if(secondMenuTrue){
               setSecondMenuTrue(false)
               setFirstTitle('')
               setShow(true)
               setFirstMenuTrue(true)

            }
            if( ! thirdMenuTrue &&  !secondMenuTrue){
                setShow(false)
                setFirstTitle('')
            }
        }
        
    }


    return (
        <>

            <div className="pa4 fixed z-5 vw-100 ">
                {!show ? <a href="javascript:void(0);" onClick={() => { handleMenuClick("firstLevelOpen") }}>
                    <FaBars />

                </a> :<></>}
            </div>

            <div className='pa4 fixed z-5 vw-100 left--2 top--2'>
                <div className="block pa4 ">

                    {show ?
                        <article className="bg-white pa4">
                            <div className="flex">
                            <p><FaAngleLeft /></p> 
                            <p onClick={() => { handleMenuClick("firstLevelClose") }}>Go Back</p>
                            </div>
                            { firstMenuTrue &&
                                firstMenu.map((item: any, i: number) => (
                                    <ul className="list br2 pl0" key={i}>
                                        <li className="ph3 pv3 bb b--light-grey flex justify-between  w-100" onClick={() => handleFirstMenuClick(i, item.secondLevel, item.itemTitle)}>{item.itemTitle}
                                            <FaAngleRight />
                                        </li>
                                    </ul>
                                ))
                            } 
                            {firstTitle ? <><div className="b--dark-red underline red pl3">{firstTitle}</div></> : <></>}
                            {secondTitle ? <><div className="b--dark-red underline red pl3">{secondTitle}</div></> : <></>}
                            {
                                !secondMenuTrue ? <></>
                                    :
                                    secondMenu && secondMenu.map((item: any, i: any) => (
                                        <><ul className="list br2 pl0 ma0" key={i + 'second'}>
                                            <li className="ph3 pv3 bb b--light-grey flex justify-between  w-100" onClick={() => handleSecondMenuClick(i, item.secondLevelSubmenu, item.displayMenu)}>{item.displayMenu}
                                            </li>
                                        </ul></>
                                    ))
                            }
                            {
                                thirdMenuTrue ?
                                    thirdMenu && thirdMenu.map((item: any, i: any) => (
                                        <>
                                            <ul className="list br2 pl0 ma0" key={i + 'third'}>
                                                <li className="ph3 pv3 bb b--light-grey flex justify-between  w-100">{item.subMenuTitle}
                                                </li>
                                            </ul></>
                                    )) : <></>
                            }
                        </article> : <></>
                    }
                </div>

            </div>

        </>

    )


}

MegaMenuMobile.schema = {
    title: "Megamenu Mobile View",
    description: "Megamenu Mobile Component",
    type: "object",
    properties: {
        megamenu1: {
            type: "array",
            title: "Mega Menu",
            items: {
                properties: {
                    itemTitle: {
                        title: "Menu Display Name",
                        type: "string",
                    },
                    secondLevel: {
                        type: "array",
                        items: {
                            properties: {


                                displayMenu: {
                                    type: "string",
                                    title: "Menu Item ",

                                },
                                href: {
                                    type: "string",
                                    default: "#",
                                    title: "Menu Link",
                                },
                                secondLevelSubmenu: {
                                    type: "array",
                                    title: "Submenu",
                                    items: {
                                        properties: {
                                            subMenuTitle: {
                                                type: "string",
                                                title: "sub Menu title ",
                                            },
                                            href: {
                                                type: "string",
                                                default: "#",
                                                title: "Menu Link",
                                            },
                                        }
                                    }
                                }

                            }
                        }
                    }
                },
            },
        },

    }
}
export default MegaMenuMobile;