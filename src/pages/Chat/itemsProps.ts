import { AvatarMini, Element } from "../../components";
import avataIcon from '../../../static/images/avatarMini.svg';

const elements = [
    [
        {
            items: new AvatarMini({
                imgPath: avataIcon,
                width: '48',
                height: '48',
            }).render(),
        },
        {
            items: new Element({
                tag: 'p',
                className: 'chat-text chat-user-name',
                content: 'Sergey Vlasov',
            }).render(),
        },
        {
            items: new Element({
                tag: 'p',
                className: 'chat-text chat-last-message',
                content: 'Cегодня проходил курс по JS и столкнулся с проблемой, но...',
            }).render(),
        },
        {
            items: new Element({
                tag: 'p',
                className: 'chat-text chat-date',
                content: '1 мая 2021',
            }).render(),
        },
    ],
];

export { elements };
