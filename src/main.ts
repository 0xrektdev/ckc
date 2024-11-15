/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import type { ButtonDescriptor } from '@workadventure/iframe-api-typings';

console.log('Script started successfully');

let currentPopup: any = undefined;

interface PopupConfig {
    zone: string;
    message: string;
    cta: ButtonDescriptor[];
}

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

     // Disable and turn off camera/microphone
     WA.controls.disableWebcam(); 
     WA.controls.disableMicrophone();
     WA.controls.turnOffWebcam(); 
     WA.controls.turnOffMicrophone();

    // Background music for the whole map
    // Declare variables at the top scope
    let backgroundMusic: any;
    let websiteMusic: any;

    // Background music for the whole map
    try {
        backgroundMusic = WA.sound.loadSound("./assets/background.mp3");
        await backgroundMusic.play({
            loop: true,
            volume: 0.3
        });
        console.log('Background music started');
    } catch (error) {
        console.error('Error playing background music:', error);
    }

    // Website area music
    try {
        websiteMusic = WA.sound.loadSound("./assets/website-music.mp3");
        
        // Handle entering website area
        WA.room.onEnterLayer('embed/websiteSignUp').subscribe(() => {
            try {
                // Stop background music
                backgroundMusic.stop();
                
                // Play website music
                websiteMusic.play({
                    loop: true,
                    volume: 0.3
                });
            } catch (error) {
                console.error('Error switching to website music:', error);
            }
        });

        // Handle leaving website area
        WA.room.onLeaveLayer('embed/websiteSignUp').subscribe(() => {
            try {
                // Stop website music
                websiteMusic.stop();
                
                // Restart background music
                backgroundMusic.play({
                    loop: true,
                    volume: 0.3
                });
            } catch (error) {
                console.error('Error returning to background music:', error);
            }
        });
    } catch (error) {
        console.error('Error loading website music:', error);
    }
    // Place the countdown GIF inside of the cinema screen
    const countdown = await WA.room.website.get('cinemaScreen');
    countdown.x = 1670;
    countdown.y = 802;
    countdown.width = 320;
    countdown.height = 240;

    // At the door
    WA.room.onEnterLayer('zone/toRoom3Zone').subscribe(() => {
        console.log('At the door');
        WA.room.hideLayer('doorTipSwitch');  // Reveals Mr Robot location
        openPopup('toRoom3');  // "Want to access the gaming room? Mr Robot can help you!"
    });

    WA.room.onLeaveLayer('zone/toRoom3Zone').subscribe(() => {
        console.log('Leaving door');
        closePopup();
        WA.room.showLayer('doorTipSwitch');  // Hide Mr Robot location
    });

    // At Mr Robot location (where doorTipSwitch is hidden)
    WA.room.onEnterLayer('doorTipSwitch').subscribe(() => {
        console.log('At Mr Robot');
        openPopup('doorCode');  // Shows the 420 code
        WA.room.showLayer('ctaDigitCodeSwitch');  // Show keypad location
    });

    WA.room.onLeaveLayer('doorTipSwitch').subscribe(() => {
        console.log('Leaving Mr Robot');
        closePopup();
        WA.room.hideLayer('ctaDigitCodeSwitch');  // Hide keypad location
    });

    // At the keypad
    WA.room.onEnterLayer('toRoom3DigicodeZone').subscribe(() => {
        console.log('At keypad');
        const isDoorOpen = WA.state.loadVariable('room3Door');
        if (isDoorOpen) return;
        
        // Show keypad interface
        WA.room.hideLayer('ctaDigitCode');
        WA.room.hideLayer('ctaDigitCodeSwitch');
    });

    WA.room.onLeaveLayer('toRoom3DigicodeZone').subscribe(() => {
        console.log('Leaving keypad');
        closePopup();
        if (!WA.state.loadVariable('room3Door')) {
            WA.room.showLayer('ctaDigitCode');
            WA.room.showLayer('ctaDigitCodeSwitch');
        }
    });

    // Configuration for popups
    const config: PopupConfig[] = [
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
        }
    ];

    // Popup management functions
    function openPopup(zoneName: string) {
        // Close any existing popup first
        if (currentPopup !== undefined) {
            closePopup();
        }

        console.log('Attempting to open popup for zone:', zoneName);
        const popupName = zoneName + 'Popup';
        const zone = config.find((item) => {
            return item.zone == zoneName;
        });
        console.log('Found zone config:', zone);

        if (typeof zone !== 'undefined') {
            console.log('Opening popup with name:', popupName, 'message:', zone.message);
            currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta);
        } else {
            console.log('No zone config found for:', zoneName);
        }
    }

    // Need Help / Follow Us
    WA.room.onEnterLayer('needHelpZone').subscribe(() => {
        console.log('Entered needHelp zone');
        openPopup('needHelp');
    });
    WA.room.onLeaveLayer('needHelpZone').subscribe(closePopup);

    WA.room.onEnterLayer('followUs1Zone').subscribe(() => openPopup('followUs1'));
    WA.room.onLeaveLayer('followUs1Zone').subscribe(closePopup);

    WA.room.onEnterLayer('followUs2Zone').subscribe(() => openPopup('followUs2'));
    WA.room.onLeaveLayer('followUs2Zone').subscribe(closePopup);

    WA.room.onEnterLayer('followUs3Zone').subscribe(() => openPopup('followUs3'));
    WA.room.onLeaveLayer('followUs3Zone').subscribe(closePopup);

    // Room desks with improved popup management
    WA.room.onEnterLayer('zone/meetDeskZone').subscribe(() => {
        closePopup();  // Close any existing popup first
        const dontShow = WA.state.loadVariable('dontShowMeetPopup');
        if (dontShow) return;
        openPopup('meetDesk');
    });
    WA.room.onLeaveLayer('zone/meetDeskZone').subscribe(() => {
        closePopup();
    });
    
    WA.room.onEnterLayer('zone/workDeskZone').subscribe(() => {
        closePopup();
        const dontShow = WA.state.loadVariable('dontShowWorkPopup');
        if (dontShow) return;
        openPopup('workDesk');
    });
    WA.room.onLeaveLayer('zone/workDeskZone').subscribe(() => {
        closePopup();
    });
    
    WA.room.onEnterLayer('zone/collaborateDeskZone').subscribe(() => {
        closePopup();
        const dontShow = WA.state.loadVariable('dontShowCollaboratePopup');
        if (dontShow) return;
        openPopup('collaborateDesk');
    });
    WA.room.onLeaveLayer('zone/collaborateDeskZone').subscribe(() => {
        closePopup();
    });
    
    WA.room.onEnterLayer('zone/playDeskZone').subscribe(() => {
        closePopup();
        const dontShow = WA.state.loadVariable('dontShowPlayPopup');
        if (dontShow) return;
        openPopup('playDesk');
    });
    WA.room.onLeaveLayer('zone/playDeskZone').subscribe(() => {
        closePopup();
    });
    
    WA.room.onEnterLayer('zone/createDeskZone').subscribe(() => {
        closePopup();
        const dontShow = WA.state.loadVariable('dontShowCreatePopup');
        if (dontShow) return;
        openPopup('createDesk');
    });
    WA.room.onLeaveLayer('zone/createDeskZone').subscribe(() => {
        closePopup();
    });

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