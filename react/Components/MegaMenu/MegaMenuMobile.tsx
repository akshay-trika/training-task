import React, { useEffect, useState } from "react";
import { FaBars, FaAngleRight } from 'react-icons/fa';

interface MegaMenuMobileProps { }

const MegaMenuMobile: StorefrontFunctionComponent<MegaMenuMobileProps> = (props: any) => {
    const [show, setShow] = useState(false)
    const [firstMenu, setFirstMenu] = useState<any | undefined>();

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




    function handleMenuClick() {
        setShow(!show)
    }

    const handleFirstMenuClick = (i: number, secondLevel: { displayMenu: string; secondLevelSubmenu: { subMenuTitle: string; href: string; }[]; }[], firstTitle: any) => {
        setFirstTitle(firstTitle)
        if (index === i) {
            setIndex(-1);
            setSecondMenu(null)
        } else {
            setIndex(i);
            setSecondMenu(secondLevel)
            setSecondMenuTrue(true)

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
                setFirstMenu(null)

            }


        }
    }

    function goBack() {
        setSecondMenuTrue(false)
        handleMenuClick()
        setFirstTitle('')
    }

    function goBackNested() {
        setThirdMenuTrue(false)
        setSecondTitle('')
        setFirstMenu(props.megamenu1)
        setFirstTitle('')
    }


    return (
        <div className='pa4 fixed z-5 vw-100'>
          { !show ?  <a href="javascript:void(0);" onClick={() => { handleMenuClick() }}>
                <FaBars />

            </a> : <></>}

            <div className="block pa4 ">
            
            {show ?
                    <article className="bg-white pa3">
                        {secondMenuTrue ?
                            <div className="flex justify-end"><button className=' bg-action-primary ml3 f6  white bg-dark-blue' onClick={() => { goBack() }}>
                                Go Back
                            </button></div> : firstMenu &&
                            firstMenu.map((item: any, i: number) => (
                                <ul className="list br2 pl0" key={i}>
                                    <li className="ph3 pv3 bb b--light-grey flex justify-between  w-100" onClick={() => handleFirstMenuClick(i, item.secondLevel, item.itemTitle)}>{item.itemTitle}
                                        <FaAngleRight />
                                    </li>
                                </ul>
                            ))
                        }
                        <><div className="b--dark-red underline red">{firstTitle}</div></>
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
                        {thirdMenuTrue ? <div className="flex justify-between"><div className="justify-start underline  pa3 red">{secondTitle}  </div> <div className="justify-end ">
                            <button className='flex justify-start bg-action-primary ml3 f6 ph3 pv2   white bg-dark-blue' onClick={() => { goBackNested() }}>
                                Go Back
                            </button>
                        </div></div> : <></>}

                        {
                            thirdMenuTrue ?
                                thirdMenu && thirdMenu.map((item: any,i:any) => (
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