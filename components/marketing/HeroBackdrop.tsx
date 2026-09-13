import { useId } from "react";

type HeroBackdropProps = { className?: string };

/** Decorative screen-print world; live hero copy belongs above this layer. */
export default function HeroBackdrop({ className }: HeroBackdropProps) {
  const grainId = `hero-grain-${useId().replace(/:/g, "")}`;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="14" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.09 0 0 0 0 0.09 0 0 0 0 0.08 0 0 0 .2 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      <g className="sky">
        <path fill="#174C3C" d="M0 0H1600V900H0Z" />
        <path fill="#2E7564" opacity=".24" d="M0 0H390C306 84 173 160 0 178ZM1600 92C1424 149 1464 355 1600 429Z" />
        <path fill="#2E7564" opacity=".35" d="M0 489C283 464 373 539 629 521S1130 438 1600 486V900H0Z" />
        <path fill="#174C3C" opacity=".5" d="M0 548C470 500 672 606 1038 530S1449 511 1600 544V636H0Z" />
      </g>

      <g className="clouds" fill="#F2E2BD">
        <path d="M-45 176C-16 155 14 169 34 154C25 136 57 122 82 133C87 107 122 104 145 119C171 110 208 134 197 151C232 143 263 166 251 180C285 181 304 195 318 204C229 211 198 199 137 207C76 213 6 198-45 211Z" />
        <path d="M-20 256C21 247 58 259 90 251C103 231 133 238 144 252C172 246 196 260 222 269C131 280 61 265-20 279Z" opacity=".75" />
        <path d="M1326 259C1350 239 1375 255 1393 241C1384 221 1415 208 1434 221C1444 190 1483 192 1501 211C1533 203 1549 229 1550 238C1594 224 1622 245 1644 270C1544 283 1524 267 1479 274C1417 282 1373 267 1326 279Z" />
        <path d="M1439 330C1455 315 1481 320 1496 325C1509 307 1539 312 1556 324L1624 339C1563 351 1482 340 1439 344Z" opacity=".7" />
      </g>

      <g className="sun">
        <circle cx="1135" cy="588" r="83" fill="#D89A4A" />
        <path d="M1064 630C1108 650 1159 659 1206 625" fill="none" stroke="#A64035" strokeWidth="3" opacity=".35" />
      </g>

      <g className="skyline" strokeLinejoin="round">
        {/* Distant city: interrupted rooflines and narrow modern towers. */}
        <path fill="#174C3C" d="M0 677L0 620L67 617L68 584L121 589L124 650L181 649L184 609L223 607L224 663L291 660L293 568L330 566L335 549L355 553L360 667L415 667L415 630L458 629L460 597L483 600L485 661L551 666L553 610L597 606L602 572L633 575L637 669L701 666L704 594L737 591L742 560L766 563L771 668L832 664L833 616L883 612L887 655L944 657L946 576L976 568L982 540L1007 543L1016 662L1090 660L1092 628L1131 625L1134 672L1242 665L1247 590L1285 587L1286 618L1331 619L1334 658L1380 656L1384 570L1417 565L1431 660L1501 663L1503 611L1547 607L1552 643L1600 639V900H0Z" />
        <path d="M305 590L307 648M322 591L326 650M959 594L965 649M985 573L993 649M1394 592L1400 644" stroke="#2E7564" strokeWidth="5" />

        {/* Sun-washed plaster, irregular corners, deep inset windows. */}
        <path fill="#D89A4A" d="M-20 714L-14 656L111 649L116 679L209 675L213 838L-20 849Z" />
        <path fill="#F2E2BD" d="M57 669L66 602L191 607L194 635L239 636L244 823L63 821Z" />
        <path fill="#A64035" d="M194 635L239 636L244 823L195 816Z" />
        <path fill="#F2E2BD" d="M270 817L271 689L317 687L317 651L442 646L447 817Z" />
        <path fill="#D89A4A" d="M405 650L442 646L447 817L410 821Z" />
        <path fill="#2E7564" d="M464 824L470 692L586 686L590 716L632 717L635 829Z" />
        <path fill="#F2E2BD" d="M644 841L648 665Q700 652 754 666L760 823Z" />
        <path fill="#D89A4A" d="M738 665L754 666L760 823L739 832Z" />
        <path fill="#A64035" d="M790 837L794 714L811 695L900 696L917 711L918 842Z" />
        <path fill="#F2E2BD" d="M930 839L933 643L1055 647L1060 675L1094 678L1097 835Z" />
        <path fill="#D89A4A" d="M1055 647L1060 675L1094 678L1097 835L1058 834Z" />
        <path fill="#2E7564" d="M1120 841L1125 707L1239 698L1247 842Z" />
        <path fill="#F2E2BD" d="M1268 853L1272 653L1388 648L1391 690L1439 689L1444 859Z" />
        <path fill="#D89A4A" d="M1391 690L1439 689L1444 859L1396 855Z" />
        <path fill="#A64035" d="M1470 847L1472 717L1530 713L1532 670L1620 665L1620 866Z" />

        {/* Bauhaus ribbon balconies, drawn as slightly uneven ink strokes. */}
        <g fill="none" stroke="#174C3C" strokeWidth="9">
          <path d="M73 644L173 647M73 680L176 683M77 718L177 719M80 754L177 756" />
          <path d="M657 696Q704 686 739 696M657 731Q701 721 740 731M658 768Q704 758 741 766" />
          <path d="M944 679L1043 682M945 716L1044 719M946 754L1045 757" />
          <path d="M1285 684L1373 680M1287 723L1376 719M1289 762L1377 758" />
        </g>
        <g fill="none" stroke="#F2E2BD" strokeWidth="5">
          <path d="M68 650L180 653M70 686L181 689M74 724L182 725" />
          <path d="M651 702Q702 692 744 702M652 737Q702 727 746 737M652 774Q702 764 746 772" />
          <path d="M939 685L1048 688M940 722L1049 725M941 760L1050 763" />
        </g>
        <g fill="#174C3C">
          <path d="M290 713L306 713L306 737L290 738ZM328 683L343 682L344 707L329 708ZM371 681L386 681L387 706L372 706ZM329 730L345 729L345 754L330 755ZM372 729L389 728L389 753L373 754ZM331 778L347 777L348 807L332 807ZM374 776L390 775L391 806L375 806Z" />
          <path d="M808 730H830V759H809ZM851 730L879 731V759H851ZM809 788H831V817H809ZM852 788H881V817H852Z" />
          <path d="M136 787Q150 764 164 787V823H136ZM974 800Q990 772 1006 800V836H974ZM1322 810Q1339 780 1354 810V854H1322Z" />
        </g>
        <path d="M485 720L570 715M483 750L571 746M1141 733L1222 728M1140 767L1225 762M1490 750L1599 745M1490 787L1599 781" stroke="#F2E2BD" strokeWidth="7" opacity=".65" />
        {/* Roof life: solar heaters, aerials, parapets and a washing line. */}
        <g fill="none" stroke="#171714" strokeWidth="3" strokeLinecap="round">
          <path d="M94 601L96 569L126 568L129 603M349 647L351 614M336 621L367 617M344 609L360 607M983 643L982 604M965 615L1000 610M1310 650L1312 616L1341 615L1346 649" />
          <path d="M443 699Q511 735 586 704M445 686L443 716M586 691V719" />
        </g>
        <g fill="#F2E2BD" stroke="#174C3C" strokeWidth="2">
          <path d="M89 567Q86 553 99 552L122 553Q133 556 127 569Z" />
          <path d="M1305 615Q1302 601 1316 600L1337 601Q1349 605 1342 616Z" />
          <path d="M469 711L483 716L479 737L465 733ZM520 721L537 720L539 739L521 740Z" />
        </g>
        <path fill="#174C3C" stroke="#171714" strokeWidth="2" d="M674 659L688 635L719 637L709 660ZM1007 644L1018 622L1043 625L1035 645Z" />
        <path d="M691 638L682 657M704 639L697 658M1026 625L1018 642" stroke="#2E7564" strokeWidth="3" />
      </g>

      <g className="foreground-horizon">
        <path fill="#174C3C" d="M0 824C169 800 210 843 358 828S608 815 770 840S1074 819 1237 834S1458 821 1600 812V900H0Z" />
        <path fill="#171714" d="M0 871L164 861L308 872L477 858L637 870L815 862L1009 877L1200 857L1394 867L1600 850V900H0Z" />
        <path fill="none" stroke="#D89A4A" strokeWidth="4" d="M-20 863L164 853L307 864M1101 863L1201 850L1387 859L1608 842" />
        <g fill="#171714" stroke="#171714" strokeLinecap="round">
          <path d="M248 868Q259 753 250 679" fill="none" strokeWidth="11" />
          <path d="M251 687Q213 636 177 665Q211 660 248 693Q195 663 180 699Q217 680 251 698Q276 646 312 668Q279 670 255 696Q302 672 322 707Q285 688 255 704Q271 715 278 744Q251 729 251 704Q233 718 220 741Q222 712 251 687Z" />
          <path d="M1452 868Q1434 762 1447 715" fill="none" strokeWidth="9" />
          <path d="M1445 725Q1417 680 1383 698Q1418 702 1441 730Q1393 710 1380 739Q1417 725 1444 737Q1466 686 1501 704Q1471 706 1449 733Q1492 711 1510 741Q1476 730 1449 740L1472 771Q1444 759 1445 739L1422 768Q1419 744 1445 725Z" />
        </g>
        <path d="M255 749L260 758M252 786L258 793M1441 779L1448 787" stroke="#D89A4A" strokeWidth="3" />
      </g>

      <g className="texture" pointerEvents="none">
        <path fill="#F2E2BD" opacity=".13" d="M102 625L149 624V626L102 628ZM336 668L384 665V667L336 670ZM950 659L1021 661V663L950 661ZM1294 668L1357 665V667L1294 671ZM838 706L882 707V709L838 708Z" />
        <path fill="#F2E2BD" d="M0 0H1600V900H0Z" filter={`url(#${grainId})`} opacity=".3" />
      </g>
    </svg>
  );
}
