import React, { useEffect, useState } from "react";
import { FaAngleRight } from 'react-icons/fa';
import styles from './MegaMenu.css'

interface MegaMenuDesktopProps { }

const MegaMenuDesktop: StorefrontFunctionComponent<MegaMenuDesktopProps> = (props: any) => {
    const [menu, setMenu] = useState<any | undefined>();
    const [index, setIndex] = useState(-1);
    const [secondMenu, setSecondMenu] = useState<any>()
    const [thirdlevelMenu, setThirdlevelMenu] = useState<any>()

    useEffect(() => {
        setMenu(props.megamenu1);
    }, [props.megamenu1]);

    const handleMenuClick = (i: number, secondLevel: any) => {
        if (index === i) {
            setIndex(-1);
            setSecondMenu(null)
        } else {
            setIndex(i);
            setSecondMenu(secondLevel)
        }
    };

    const closeMenu = () => {
        setSecondMenu(false);
    };


    return (
        <header className="bg-light-blue" onMouseLeave={closeMenu}>
            <div className="bg-danger">
                <section className="pa3 pa4-m pa5-l " >
                    {menu !== undefined &&
                        menu.map((item: any, i: number) => (
                            <a
                                className={` c-on-success relative pa3 f3 link b hover-bg-white hover-c-danger no-underline  dib ph2 pv1`}
                                href={`#${i}`}
                                onMouseOver={() => handleMenuClick(i, item.secondLevel)}
                            >
                                {item.itemTitle}

                            </a>
                        ))}
                </section>
                {secondMenu?.length > 0 && (
                    <div className='w-100 flex absolute bg-base z-1   c--action-danger c-on-muted-1  h-auto mt6 pa4 top-2'>
                        <div className="w-25 ">
                            {secondMenu.map((submenu: { displayMenu: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; secondLevelSubmenu: any[]; }) => (
                                <div className={` ${styles.submenu_item} c-on-muted-3 f2 flex hover-c-danger justify-between pa2`} onMouseOver={() => setThirdlevelMenu(submenu.secondLevelSubmenu)} >
                                    <p className='ma0'>{submenu.displayMenu}</p>
                                    <FaAngleRight />
                                </div>

                            ))}

                        </div>
                        {thirdlevelMenu?.length > 0 && (
                            <div className={` flex flex-wrap  bg--gray bg-base c--action-primary c-on-muted-1  h-auto  left-1 top-0 w-75 z-1 pl4 pr4`}>
                                {thirdlevelMenu.map((secondSubmenu: { subMenuTitle: boolean | React.ReactPortal | React.ReactChild | React.ReactFragment | null | undefined; }) => (
                                    <div className="w-33 pa2 box-border">
                                        <div className={`bg-light pa3 mb2 c-on-base  ma0 mb2`}>
                                            <p className='ma0'>
                                                {secondSubmenu.subMenuTitle}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div>
                        </div>
                    </div>
                )}

            </div>

        </header>
    );


}

MegaMenuDesktop.schema = {
    title: "Megamenu Desktop View",
    description: "Megamenu Desktop Component",
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
export default MegaMenuDesktop;