/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    // Place the countdown GIF inside of the cinema screen
    const countdown = await WA.room.website.get('cinemaScreen');
    countdown.x = 1670;
    countdown.y = 802;
    countdown.width = 320;
    countdown.height = 240;

    // Manage the animated CTAs
    WA.room.onEnterLayer('toRoom3').subscribe(() => {
        WA.room.hideLayer('doorTipSwitch');
    });

    WA.room.onLeaveLayer('toRoom3').subscribe(() => {
        WA.room.showLayer('doorTipSwitch');
    });

    WA.room.onEnterLayer('doorCode').subscribe(() => {
        WA.room.hideLayer('ctaDigitCodeSwitch');
    });

    WA.room.onLeaveLayer('doorCode').subscribe(() => {
        WA.room.showLayer('ctaDigitCodeSwitch');
    });

    // Configuration for popups
    const config = [
        {
            zone: 'needHelp',
            message: 'From CoolKids for CoolKids',
            cta: [{
                label: 'Spread the word',
                className: 'primary',
                callback: () => WA.nav.openTab('https://twitter.com/intent/tweet?text=Just%20tried%20CoolKidsClub%20world%20and%20i%27m%20really%20impressed.%20@coolkidsclubsol&url=https://play.coolkidsclub.space'),
            }]
        },
        {
            zone: 'followUs1',
            message: 'Hey! Have you joined CoolKidsClub already?',
            cta: [
                {
                    label: 'Telegram',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://t.me/coolkidsclubportal'),
                },
                {
                    label: 'Twitter',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://x.com/intent/user?screen_name=coolkidsclubsol'),
                }
            ]
        },
        {
            zone: 'followUs2',
            message: 'Hey! Have you joined CoolKidsClub already?',
            cta: [
                {
                    label: 'Telegram',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://t.me/coolkidsclubportal'),
                },
                {
                    label: 'Twitter',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://x.com/intent/user?screen_name=coolkidsclubsol'),
                }
            ]
        },
        {
            zone: 'followUs3',
            message: 'Hey! Have you joined CoolKidsClub already?',
            cta: [
                {
                    label: 'Telegram',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://t.me/coolkidsclubportal'),
                },
                {
                    label: 'Twitter',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://x.com/intent/user?screen_name=coolkidsclubsol'),
                }
            ]
        },
        {
            zone: 'doorCode',
            message: 'Hello, I\'m Mr Robot. The code is 420.',
            cta: []
        },
        {
            zone: 'toRoom3',
            message: 'Want to access the gaming room? Mr Robot can help you!',
            cta: []
        },
        {
            zone: 'meetDesk',
            message: 'Welcome to CoolKidsClub world',
            cta: [
                {
                    label: 'Dismiss',
                    className: 'normal',
                    callback: () => WA.state.saveVariable('dontShowMeetPopup', true).then(() => closePopup()),
                }
            ]
        },
        {
            zone: 'workDesk',
            message: 'Are you worthy? ;)',
            cta: [
                {
                    label: 'Dismiss',
                    className: 'normal',
                    callback: () => WA.state.saveVariable('dontShowWorkPopup', true).then(() => closePopup()),
                }
            ]
        },
        {
            zone: 'collaborateDesk',
            message: 'Have fun with others',
            cta: [
                {
                    label: 'Dismiss',
                    className: 'normal',
                    callback: () => WA.state.saveVariable('dontShowCollaboratePopup', true).then(() => closePopup()),
                }
            ]
        },
        {
            zone: 'playDesk',
            message: 'CoolKids love games right?',
            cta: [
                {
                    label: 'Dismiss',
                    className: 'normal',
                    callback: () => WA.state.saveVariable('dontShowPlayPopup', true).then(() => closePopup()),
                }
            ]
        },
        {
            zone: 'createDesk',
            message: 'Are you ready to become CoolKid?',
            cta: [
                {
                    label: 'Dismiss',
                    className: 'normal',
                    callback: () => WA.state.saveVariable('dontShowCreatePopup', true).then(() => closePopup()),
                }
            ]
        },
        {
            zone: 'webinar',
            message: 'LoremIpsum',
            cta: [
                {
                    label: 'Close',
                    className: 'normal',
                    callback: () => closePopup(),
                },
                {
                    label: 'Sign up',
                    className: 'primary',
                    callback: () => WA.nav.openCoWebSite('#'),
                }
            ]
        }
    ];

    // Popup management functions
    function openPopup(zoneName: string) {
        const popupName = zoneName + 'Popup';
        const zone = config.find((item) => {
            return item.zone == zoneName;
        });

        if (typeof zone !== 'undefined') {
            currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta);
        }
    }

    // Need Help / Follow Us
    WA.room.onEnterLayer('needHelp').subscribe(() => openPopup('needHelp'));
    WA.room.onLeaveLayer('needHelp').subscribe(closePopup);

    WA.room.onEnterLayer('followUs1').subscribe(() => openPopup('followUs1'));
    WA.room.onLeaveLayer('followUs1').subscribe(closePopup);

    WA.room.onEnterLayer('followUs2').subscribe(() => openPopup('followUs2'));
    WA.room.onLeaveLayer('followUs2').subscribe(closePopup);

    WA.room.onEnterLayer('followUs3').subscribe(() => openPopup('followUs3'));
    WA.room.onLeaveLayer('followUs3').subscribe(closePopup);

    // Room desks
    WA.room.onEnterLayer('meetDesk').subscribe(() => {
        const dontShow = WA.state.loadVariable('dontShowMeetPopup');
        if (dontShow) return;
        openPopup('meetDesk');
    });
    WA.room.onLeaveLayer('meetDesk').subscribe(closePopup);

    WA.room.onEnterLayer('workDesk').subscribe(() => {
        const dontShow = WA.state.loadVariable('dontShowWorkPopup');
        if (dontShow) return;
        openPopup('workDesk');
    });
    WA.room.onLeaveLayer('workDesk').subscribe(closePopup);

    WA.room.onEnterLayer('collaborateDesk').subscribe(() => {
        const dontShow = WA.state.loadVariable('dontShowCollaboratePopup');
        if (dontShow) return;
        openPopup('collaborateDesk');
    });
    WA.room.onLeaveLayer('collaborateDesk').subscribe(closePopup);

    WA.room.onEnterLayer('playDesk').subscribe(() => {
        const dontShow = WA.state.loadVariable('dontShowPlayPopup');
        if (dontShow) return;
        openPopup('playDesk');
    });
    WA.room.onLeaveLayer('playDesk').subscribe(closePopup);

    WA.room.onEnterLayer('createDesk').subscribe(() => {
        const dontShow = WA.state.loadVariable('dontShowCreatePopup');
        if (dontShow) return;
        openPopup('createDesk');
    });
    WA.room.onLeaveLayer('createDesk').subscribe(closePopup);

    // Manage the popups to open the Room3 door
    WA.room.onEnterLayer('doorCode').subscribe(() => openPopup('doorCode'));
    WA.room.onLeaveLayer('doorCode').subscribe(closePopup);

    WA.room.onEnterLayer('toRoom3').subscribe(() => {
        const isDoorOpen = WA.state.loadVariable('room3Door');
        if (isDoorOpen) return;
        openPopup('toRoom3');
    });
    WA.room.onLeaveLayer('toRoom3').subscribe(closePopup);

    // Bootstrap extra features
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};