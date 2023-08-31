import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

const DUMMY_DATA = [
  {
    firstName: "Sonny",
    lastName: "Sangha",
    job: "Software developer",
    photURL:
      "data:image/jpeg;base64,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",
    age: 27,
    id: 123,
  },
  {
    firstName: "Elon",
    lastName: "Musk",
    job: "Software developer",
    photURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhUZGRgaHBocHRkaHBwcHBohGhoZHBwaHBwcIS4lHB4rHxocJjgnLS8xNTU1HiQ7QDs0Py40NTEBDAwMEA8QHhISHjQhJCE0NDE0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIARYAtgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAQMHAgj/xAA9EAACAQIEAwYEBAUDBAMBAAABAhEAAwQSITEFQVEGImFxgZETobHwBzLB0RQjQlJicuHxFjOCspKi0hX/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQMCBP/EACIRAQEAAgICAgMBAQAAAAAAAAABAhEhMQNBEjITUXFhIv/aAAwDAQACEQMRAD8A45RRRWyFFM+zfCf4rE2sPnyfEbLmy5suhM5ZE7dae43sZlFzI98ultXCXcM9hnL3rdpVUM5Jk3NxzEc6WzU+irE/Y3GBsvw00V2LC9ZyqLRVbmZ8+VShZQwJBE9Naxwvsw744YK8wsNDlmgOFCWjdB7rAMCoGoPOaNhXqKt2K7DXkw63VcNcNy8htQFyiwL+Zs7MAdMO5yxOnOl9jsli3AYW1AZLTKWuWlDC8GNsKWcZnYKxy/m022o2CGin3GezN2xat35zWnt2XznKsNeTN8NQWlyo3KjQEExNa27PXiEKAOHW235kUqbmighmmJ0zaAnSjYJaKn4fhrF7SOcgukZWMEgFimYrMgZgd42pg3ZplUMzx3bzMAslfhkBV31LSI23o2CCinKdn7vezlVhHcEMjAlGVWQkNCkFxM7VjGdnryM6wrBCwkMoLZFDNlUnM2VTJAEjnTBPRTW1wS58e3YuQjXCANVYqDzIVvkYrz//ABb0KQoIYrlGZJIYwrFc0qCQdTpQCyimqcCvlsoVCSFIPxLeVg5KrlbNDElSAAZkV5HA8RAPw9yoC5lzd5sikpOYAtoCRFALKKZjgd8sVCroAS2dMmrFQM+bLmLArEzIrB4HfCM5SAockFlDRbJVyFzZjlI10oBbRRRQBRRRQBRRRQRjwHijYXEW8QqqzW2zBWmDoRrGvOmtrtULRJw+FtWSQgJD3n1t3rd5D/MdohrcQNCGPhVZopaNbMT21YrcRMPatpdS8HVS5l8QbZe5LMYP8pQBsBO9QbnaZ2xZxeRM5tm3l72WDh/4ed5nLr50hoo0F1u/iJed1L2bTAOXK94Bg1h7DrIaRmFx2nfM1Zwv4g3Lb5kw9sBbdu2qB7wULaVwiuA/81IcyrTO8jWqTRRoLHxbtXcxGHTD3LdspbW0tsiQbZtqUZl/1qRmXbuqQBFaLfHTlVcio2W0hujMWCWmVh3Zicyg+MRSzDYZn2GgmTHQfWt9zhxA312yx7/OeVHAeuO8RF6+1xJVdAg2KqNtttZPrUvFdpbr/EDKkXDbJEEgZIkATsxUEilQwvKQT4V6fCwOftpRwDXG9pXcMMigMtxfzM0C7kLRmOkFBAEAAxFZvdqbjK4yBS5Ygo1xQpdQrGA8NtIDTBJ5aUl+EOteTaO4E+VHATzxdv4kYnKuYMrZdcvdAAHXlUyx2mZERPhowUoe8WI7jZhCkwrHmRSNrZG4jzrxRoLHb7VOGzfDUkKiglnJhHZhLZszTnIIJgwPKo1/jxaGNm2XUrDnMTlVi6qBIjUwSIMUloo0FgvdpS5IeyroVUFWZixKMzKzPOZoLEa8jWi92huPJZVJKXlJ1H/eYsxieUwKTUUaAooopgUUUUAUUUUEKKKKAKK9IhJgCfKm2HwGTvONeWmg8fHnSt0Zfh8Kz+AqdbwShdddRvEHrHpHzpnhjbRQzo7OQSI0SDIGvkOXjO1Rb5ZWzPlCkTlUyTqRBnNl1HOd9jS2YxIYHKEyBgCJldCPzeRqO1i4ROgB5kQPnv51KS6LjAhSNSSZ0HlOvrPPlRfuR+UQBpuCSB/lBJ9DSBd8IDnr4fe1SbKJuTH+rXzghSKlWELT3eWvd+kgx714bAZmhWAPiZbw5/Skbzcv2YjKc3XQ/SPrUVUB1XlvH7Dat17BwNXUneOfzqOhKMD+x+etAYuqcuv7/YqKLE7fOmll4IkePv1O3/FeL1gDY6EzuJHpzp7KwpZCNxXmmj2jABAIOob6yT+tRsTg2XUDTfQg7z08q1KSJRQBRTAooooAooooIUVmsUAV6S2TsJrzTbgvDmuvzyrlJ0JgEwCYGgmBr1pURK4XgAvffX6DwAG5pk6owIuZtwVRd9A2hOuhLA+g1qRetlUAjbnzHIEDkJ0H60p1YyW103PgeY0FT3tvWkq5iFJiHCkQBCnaN5jpvFar+GIJ1kDrJB+/KtZk8zPLY+YoeyTGp8Rm1HoYpm0/D5AqPLXXr9KlWcGRDAjzOmvgNP1rWLLT3TBHj6gzy8/9qxZuODGeeqmPmCINBaZxVtyRm7unTT01MeU1i1g1O5JPkI+f+9NGKwO6pkR3TA20BU+PIHl6VCTEICYQr5SY9DrQb2uEVhGXKQOjQemmbeof8FoSQJB9vnFb3cSZA23BPnsdPlW98UBBXXQaSenWJ9586AgNhdyTvyIBHhruK83MJOXNMHnvHh7zpz19NuIxOYaaHmPeZ6VGR22O23h6x6UEwuGAJCtmPKOfj961tNokZl35853nbQH9qzYgHXnIMiSN+v3PlUm3bMhh+VjtHdkHaJOkcvrOgNFhwYfvDfw+RpbetFTDCD9fEU+KnMW7yknY+Wh8ZFReLjMoaOXynf61qUqT0UUVohRRRQTJrFZooDFX/s7gDaRQxhrpUkyO70XrPXz2pF2P4P8AHulmEpbGZuU9FnqdfRW6Vb8diQju5A7iMFDHdmhCQNyZYeQUzFTyvpvGeyPtBipcBCcqiIO5IJ1b1J+VISCWPppy0ETUzvXGZiefPnrrHj+9TsNgczaCs71GpjcqjYa0SNTp+pjc7xE1IuICJ59Zn1FPcPwwaTU9eGp0FYuas8alX2IgiZ8iCNeXUeG3yqOyZtQIiP0q7PwMse6N6P8ApdjED1pzOD8aoAN0M8+h6HwI2mtN1GJzHU7ePr86u69nWWNJ0+fL9a3nsuTyjbw16e8Cj5l+NQ0ssRHQxP0oGFbxmPsEV0W12UIIIXumfONf9vasP2aYtrEgehk/Z9aPmPg5y1gxEayPv51sSwY1HKfv61fsR2YGhiI58zPP3/SvOH7Mgfm8opfkg/EpRYmGMSdT4nrrzrOFSCrZtJymD3iddIEk7MZG8+OlsxvZ2DI18P8AaqxxHDfDcGBBMkbGB4jl5dTWscpSywsm0m5woqjvH5Rm0MEQARptpmPz3FKcQyMpyg5sv9UQCTLbACI+tScTibl2DAkHTly2BBEaDYcvlrwds/QTtJPI+OjcvfStpVWrtuPn8vsVrpnxvD5HgCBv76j03pZW4yKKKKZPVYrNC0B1vshgPhYW0VQs124uggzmykSRyy5dtgTzNIu2VwNeu5CMqOUAE6ZJlj1106710Ts1hs2Bwz6Bvh5gF5M0ARzkDr01kVzTjljI7oNZ1I6ayc07kkKfTxqM7U9IvCLUKJHU+8D9Kf4O1G9JcINIFO8M1Tzq/jhvYSaZYe0KX4YTFNcOaja6JE/D2x0qdbQRtUOzU+1rTjOT1bw4napaYZZ25ztWteVSrTyKpEsq8NZGWOVRbi0xO1Lry0ZDFGur1qG8VLumoNxvGpWqyNV4CNarPHOFBxmG41PiOdWS80il+IBymnjdUspwpL4eFyrurZmkazoJ9ACQf2rYmFEgtzVTOwJLQp9ufiKk4twrqdjtI58o18YNTrCBsgOuh0H9ucSJHUx5a1eVzXFV+0uBJRHAJyyp8mjL6g/fWnnw2rqlnBl7TplBKHRdf6WWIPnHofCuWOIOs+uh9fGq41PKPNFFFbYeqAPGPHpRWKKH0l2XuIeH2cuihFChiCYKghSfIgT0E1Qu0ODYCYAZjmJjUlyTrzYiRp/SD4mrD+FLM3DgoM/zWUEySui6A+Ajyk9Ka8RwqGe7I7wE6KNYzGd+enlUeqpHLuH2DNObdvUVqS3DnSNT4fftU9UqWV5dOE4ScKeUU0sCluGWmVg1OrbMbRqfhzS221TbTURnIxEnl99a3WtOVR0bStgatxKpJbSol8UZzWm49FokaLpkaUvcQalXLnhUW5ryqdVjyEBmoWMt6GBp961MU1su2Mw8acZtc+4wkknf6ipfZ4kzmP5JIbcnQNr6A69QKk8XwO515j9Qfr7VP7IYAGTzykGf61zRGm0EE+tVnSOXafwbhwDudCCXXXXfKB4RED1rkvbnhy2MZcCfkc/EXwD6x7/Iiu720CIVIgqoIO8axPlrPTeuE9u7xfGXH1yucygmYGxA8MwaP+Kph2ll0rlFFFWTeqKzWKYdj/BrEn+GvIIGW6CJ/udImef5APSrXiFa65RILgQzkQCAFEgH8oOZvRa5/wDhol2w727ishufBuKGiQpW6VaP8iRExy6103hdoh3dp7wBE8hqYMbaD73qN+ys6VLivCmQyIPWNOcCodoeFXPG2BlYb90+BnXz5zzMSY5RUGUh4jY+X3pUs8dcrePLfCQBHKpeHE8q0LbMb1Mwyxv9KittMtp9zU3DpWqwoqUjxWpGLUhFIECjrp8/pWUcHn6fe1ZG9b0y8ovn61qvDpr9+FSFcc6y0GlRKUXFPQ/fnUW5M/701xCQKW3EM7VixSV4yxE1OtpKgff3+tQZJPlv7014cYInlPPw5+4rWE2xndFmJwkqyssncExpprv4cp2BrPBrWVg4iMpDR/doPUFYnzp58POTAHjvptrrVcvYd0TeZ0y+ZIOvUhY15gVWzSUu0Ht9xYWcNcZW776JygsFnyIyMwB6Rzrhd26zGWMnqfvxq3fiJxF2vm0SYXUryzSRqOoiPU9ap1VwmojleRRRRW2XusGs1g0UOl4jiTY27h8TbKpft2lzIZhlRiCU1EgQ0iRtO1dbsx8Mkj8y8xyk71xX8P8ADtdu2AsZkGMSTqADYJTNpoM9xvY12OxmNtBmDZQwlTmU5Z1DaSAff1qXta61NIlkZnZRtJIHIAxGi+PXqN9YX9oLVu0qSZeSY056yQPL5nwnDYv4buCdkiJOkDczz1B113rnfabtAbj6EgToOmgE+PPlOu9GU3NDHi7WZ+KryZYGup/XbflWbHaVNFZgD7j3qk4PDvdHcJP6V7u9m76mZUE/3MF+pqXxi3yvp0jB8XR9mH31qeuKB1BrjzW8TZJO/ipDCnvB+0R0Vzr40XH9HMt9ukre8a3fxVIMHjc4HvUprhGtYa0breG9Z/jF5mKrGO4wEmTVP4tx+5cMJt6/KtSWldR0fG9oLSbtPzqCnaO00d4CdiRp5Tt865tZ4Xi7uyuR5dTPPU7VOHDLqQbmcR1B5ePOi4xmW/p07A31ZpGo3I303PrHyptiMMV0U907E+OvPY/L2rlfDMRlYKH0me8TB1kz4V03DYtWQDWduZA8NT0BE1rHUYz2k8NuRK5YA++XSf8Aml+fu5Csw6k851YiIpngjzjWPvYeHrSTjeK+FpElyEUbSXZgB7Bp6LNO9M480j7T2MGcJiPjxnuLca1Als1sFg67QMwgnQGY51wyuqcX4eRc4lccmFXEKsmcqhWW2oJ5arXK634rxYXlmrP9goooqqOnusGsmsUwtXYjElVx0Eg/wlxlYHUEEJHqLh9q7V2PIfA4ZdCVtWwR0IQA9elcD7M3P5j2+d61ctDWJZlzIPV1Uetdg/C7imfDKgOqQrCTIiQJ5wQJ9fKpZdq4/VH7Xdw3GAGqkCI5yOm3L33NctxCSWLc9a7F2xsZmiJBPjAiZ0nqduVUm/wXXYe1YuWrpvHHc2rmFe87BEYqsickgKDMSZknTyr3xfg5tX1lc4GRsrMRnEgspYaidRI2pmwfDEMqjLJnrrHPyFWPC8ct3FHxERjyzKDHlrRMpDuFvsi4P2Se5h2uqCjhjl1MOunPcayAaRYvCOhkg78xBBHJv3rrK9oSyhERSdBC90R0gEaVpfCIbbF7S5mBB8Z/XXQ71i5zfB44WTlX+w18uMp5ffpV2xGDJXb6VU+zmFFu8QNjrV/xB7g8qxbyp+nJ+PWW+KU/pG9aOH8MuXnyJ/LUHvNGvl5+Hv0q+rhUzMzJmkzI3GlRBilsPohVTtGoPr1pzIXG3pzXHYe6ly4jByQcqNnjIQ6yWEd4FAw8yDypyjYqxYt3Tcd0cd62xzx3oBGadCNY8auWKxeGuHO9lWP92Ygx0MCG5bio9/iqXGVAixpAEnlMCPQevgapcsbEphlLuqrbZb0OqBHUwwE5GG4ZR/T0I8qvvA7gjLyy7b76nx2FL34CuYukhmYsYMDUzsBH7U14fhcmka899fl41jfLdnCx4VAE89hsemv30qt8avkYlFjMgCvljVWUsA08tCfc1arLAKJj6/Z8qrS22d3cxuVEdFJArWd1GPFN3lWfxZvCzZuqDriLi+cBVZvTRR/5CuM10D8X+JK+Jt2lM/CTva/1ORp/8FQ+tc/q2E1P6lnd3+CiiitsPVFFE0ye7F5kdXUwyMGU9CpBB9xXeuFLZs3MNcs2wn8ar3WZf9KXUUjkQpcQB9a4FXU+yOKe++CeZS2q2Ss/kYD4fpmXK3rWM43h7X/j8Ejw/WTv8/X2UNhlYEVo45xLI+VjrJ3nmSB+nrNQ8LxHXeubPvbq8fWkr+CGzCR03os8Bw8ybYmp1q+GjnTGzaB/b9qxK3Yi4bCIghEC+mvvUjFEKkEb71MRAomNaRcZxBHPnRazOS3D3FF8Daroxm36VzW1eJvKRvNdCRz8HxonB3nSNwxxOvU16xWEWSpUFDyOo8qX4RiPcmnNt8w1pQ72Sv2YwzcmXwDGPmalYXg9m1+RRPU6mnSWa1XrPM8qdZ3toUCvaW5IO2u58BM1GuvFSrNwFJU6yOU89vb9fGXjzSymokcUxIRCT0gCdZJyge5FVzieIbDIztBRbfxXcaTOuUcsxYqo8W8KY8ctm4iqCYzSSJ0yo0fM/IVTPxb4rlweHw4MF2JYCPy2lUAHwzMD5rVNfLLSe/jjuOT8QxjXrj3XMs7Fm8yZgdANgOgqNRRXS5xRRRQHqig1imQqydhOKvYxtgI3de7bR1P5SC6gN4MJkHl5SKrVMOz7ZcVhz0vWj7OtZy6E7dF7c3il4nYTERHIEeYidaWYHGzH1/5rd23fMzEk/njz7u/h+Uj7FVfB3yjVGzcdMy1XTOGXJirNhGqj8ExIIFXHh92RFc9mq6bdwyLaff2KqPaF2zqo/qNWd25VTO3OM+CUIGrBiD5QP1pybqd4iFgcKwug7id/KujKP5G+sVx7gvaZs5zCRPqJ5+VXe32hUIWLSI+9K1ZZeRNWcJCqxcwdqccLuEjWqLg+1yG4yxB2j9zV34YM1tXXYzWLLO2t7OlateKOhrzbuaVGxWI03psycl965rW21e7oA105RyH+3z91mLfnPP8A42rxhr0uomdxoZ6QRpRjwMuTTjfHrWCS0918ofOY3ZoKaKu50byE61wrtRxxsZiHvsIB0RRsignKvnqSepJq+fjbcn+DHRb3zNr9q5XXVhjxty5ZehRRRVGBRRRQHqsGig0yYr3ZuFWVl3Uhh5gyPpXiis0Oj9qGzBj1PyJYjc9PeBVTC07bF/Ew9lt4Qq09bfdE+JA89T1pUEE6VKLnXAsVGlX3heJ0Gtc0wggg+NXXheMAUE1LOcr4XhazcnnSftXwxMRYhvzIJU8x1rDcRBOhqQcTmTzrE4b7cSxFtrbnw086mYPEXHIRAZPjt8qvGL7OB3Jy767fSpXBOzWS8CRpVbnNIzC7ROA9icwDO2XmY/MfWuj4YKiBFEKoAA6AaCtKplEcq8M3MVK21WSRtuvFKcbivGpTPSnHWpO59I9Ty2rJtt4H4GcRqfEddJ+YpdwrN8QR/dHz08tDT7GYcph1B1EzPhAA8jr9aW8KtANy5mPatpxVPxiLG5hugttrruXO58QAa5vXUu1eLTEYm7h2HcVUSRurKs5h4hnI9CK5vxHBPZuNbcQyn0IOoI8CNa68Z/zHJl2i0UUVohRRRQGaxRRRSFe7VpnYKoJY6ADnUyzwq4dWAQdW0Poo1+VOMFbSyO6SXYaudCByCjkDQE3B8P8Ah2Wt5iXPeMbTHeVf/Eb84pXdlCPED79qYC+d/Waj4mLitESupHTxA6aelYs1ypjlxptwzAxTi5iCi76RM1TbOKKnyNXfg9y3eUBtwOdRzmuVsLsi/wCo8r/4+Rpja7ZgaJbZjy+xXnjfDlXvIo/Q1B4dxFEbbIeY/Y0axs6am5dWp3/WWIVg2Qqo5ZSB8xTofiOQmiJn5kfoOtb8H2ktkAMqsACNYjWNfPQe1TLfHcMkZbdsExsq8iT08flS4V0UYf8AEK5/VZLr1AbbTnFbn7f2m/odT0ipmP7QK4EKg8tPD6UowtxbtwZVBg6tGg8utLWJWPeD7VkvBVlWf6gVj3q2cMcXO8djt46VAuYOyV1UE9Y1rxhMYA6ougXXTwrHF6LnS1cVI+GVJ5THWYFVq7jlw9t7rflRc3TMYhVHiWgetT7uKLz0OkRPL9xWO1PAlHDL5cfzHKMP8T8RYUeJBM1uTdTt1HHMDjm+K1x9Wdi7HqWJY/M1bOJ8JXGWQVj4yDuH+8b5D+nQnxNU7BjUVe+D90CutyOYupBIIIIMEHQgjcEcjXmujdrOz4xCm/aH84AZlERcA0n/AFj5jx355ctlSQwII3BEEeYNBvFFFFAMGwaJ+dyx/tT/APR/ap+AvIPyIF8d29zShxWUvFQQNzuaCSsdjmdsqnnE8zyqSb3e8tB6Uow4748NfYTUiyY1oBst3SlV3Esl3Mp1HsRzB6ipHxKXYlpaiiJOIQN30HdPL+07lfvlTLgd51MKa8dlr6Z3s3B/LvLln+11kqwPLdh/5UXLbYe4RuoMftUsp6VxvtYr4dhtSy5whm1pzgcYjKDM+f0pt/F2lSTGnU6VHdjo1KquG7PO3MgVNt9kidm18KuXBES+AQ28gARBj6ip9iwc7JpCnU8tp+hpXLJqYxQ07LODqxNNbHCLlsQo9qvN+wiW0cGZbKZjQxIg+U1DOKTfSs5W+xNeiBbTwcwis4DDpLMZJ22++vyrdxfiagQNyaU4TiI+IEBJY8t8nn/kRER59JMcaVyi78HwwLBiJiIHjG/7Uh/EXjoynDqdE77+cd1fnPtWzjfaJMLaAXW6whV3jbvN5Vy3jfEWYFS0u7Z3PidQP19qrhN8JZZa5Q8MdVNXnAMMo15VRbQ2q58PbuDyFdLmNrb6/X9qr/EFR2KXUD5SQG2cDlDD/jwqdcuxsaXY8y+b+5QT9P0pmT3+zasZtXljpckEeoGvsKxWu7dYHQ1ilotlrCtLipLCtLiihrttB9K2I9aiKwDQG9r9aHeawTWKAAaY3uIM8MT3gAD/AJRzI50urIpWNSp9vFkfl06ry9P2qeOI5l71JFNSMJaLuiDd3VI/1MB+tYsjUysdf7IcOdbdlmKpKBlBnMQwGUkAd0b7603tg/EckiMwGhB2RenKtHC75LuWJOsCegAWfcH2rNi4Bccf5fVVrly7dmPTZ2xtOmBuMBojWWkchnyk+UN9wa5y3aAgQD611fF4dr9i7ZJhriXra+TpKeerTXz0GPPfmOlVxxlRuVl0d4/jTNoh/wDLp5A8/H26jTwriPwpYasfrrPnv86VV7LBRJ9utUmM6YuXtMxvEXZi7sWc7TrH+wpWrFmk6kmvDMWMmpFlKpjNI5ZbMMDbzNvVmw5gVUlaDpTrh2KJEE1ooZvrUPiZyhD4MPaD+pqU50ml3FrkoPB/qD+1BlN5pNFaiaKCaTXg1sNeCNaA0OleDUlhWplpBpor2RWIoDzRWSKxQb0rU77Js38XZKzmBYiInuox5gjl0pFVt/D+yvxbl1wMttIE8muOqTr/AIl6zl01j26TwlixYtvP00rxb/77+a/+oH6V44POUHmfSjDsf4lwREqp/wDb9q4tu6RYbN52QBT3kdYO+mvdIkSNuYrhfajDm3jcSrCCLzmPBnLLv/iwruXD9GI5EdRodwdfGuZfjJgguLt3lEC9aUt4shyn/wCmSreLlz+bhR2ugbamtDMSZNeVFbUWuiRz27ZRak2l0rUoqQogVoga22buU1qrBFAWFMUCo15VBxrypHl8jS5WIESaJoDFFZL0UB4rW4oooArywoopUNbCvEVmigMEV4YUUUBiukfh3hFXDtdOpe5t0FhC49Sz+wooqef1Uw+y34W6LdvMRm2EcpYwD6TNS8RaWEuBQHbKCw0BUgkArtIPPzoorkvTthphVC5W/qGWehDFuXIjKKqn40cNBwtm6Im1cy6/23QNAPAqvzooq3j7c/l6cXWt6LWKK6Y5m4DWttFFMAUUUUARQaKKA8NqaKKKA//Z",
    age: 40,
    id: 456,
  },
  {
    firstName: "Sonny",
    lastName: "Sangha",
    job: "Software developer",
    photoURL:
      "data:image/jpeg;base64,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",
    age: 21,
    id: 789,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  //   const { user, logout } = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  // useLayoutEffect(() => {
  //   const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
  //     if (!snapshot.exists()) {
  //       navigation.navigate("Modal");
  //     }
  //   });
  //   return unsub();
  // }, []);
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  // useEffect(() => {
  //   let unsub;
  //   const fetchCards = async () => {
  //     const passes = await getDocs(
  //       collection(db, "users", user.uid, "passes")
  //     ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
  //     const swipes = await getDocs(
  //       collection(db, "users", user.uid, "swipes")
  //     ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
  //     const passedUserIds = passes.length > 0 ? passes : ["test"];
  //     const swipedUserIds = swipes.lwngth > 0 ? swipes : ["test"];

  //     unsub = onSnapshot(
  //       query(
  //         collection(db, "users"),
  //         where("id", "not-in", [...passedUserIds, ...swipedUserIds])
  //       ),
  //       (snapshot) => {
  //         setProfiles(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             ...doc.data(),
  //           }))
  //         );
  //       }
  //     );
  //   };

  //   fetchCards();
  //   return unsub;
  // }, [db]);

  // const swipeLeft = async (cardIndex) => {
  //   if (!profiles[cardIndex]) return;
  //   const userSwiped = profiles[cardIndex];
  //   console.log(`You swiped PASS on ${userSwiped.displayName}`);

  //   setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  // };
  // const swipeRight = async (cardIndex) => {
  //   if (!profiles[cardIndex]) return;
  //   const userSwiped = profiles[cardIndex];

  //   const loggedInProfile = await (await getDoc(db, "users", user.uid)).data();

  //   getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
  //     (documentSnapshot) => {
  //       if (documentSnapshot) {
  //         //User has matched with you before you matched with there
  //         console.log(`Hooray, You MATCHED with ${useSwiped.displayName}`);

  //         setDoc(
  //           doc(db, "users", user.uid, "swipes", userSwiped.id),
  //           userSwiped
  //         );

  //         setDoc(doc(db, "matches", generateId(user.uid, userswiped.id)), {
  //           users: {
  //             [user.uid]: loggedInProfile,
  //             [userSwiped.id]: userSwiped,
  //           },
  //           usermatched: [user.uid, userSwiped.id],
  //           timestamp: serverTimestamp(),
  //         });
  //         navigation.navigate("Match", {
  //           loggedInProfile,
  //           userSwiped,
  //         });
  //       } else {
  //         //User has swiped as first interaction between the two
  //         console.log(`You swiped on ${userSwiped.displayName}
  //      ${userSwiped.job}`);

  //         setDoc(
  //           doc(db, "users", user.uid, "passes", userSwiped.id),
  //           userSwiped
  //         );
  //       }
  //     }
  //   );

  //   console.log(`You swiped on ${useSwiped.displayName} (${userSwiped.job})`);
  //   setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  // };
  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="px-5 flex-row items-center relative justify-between">
        <TouchableOpacity
        // onPress={
        //   // logout
        // }
        >
          <Image
            source={{
              uri: "data:image/png;base64,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",
            }}
            style={{}}
            className=" rounded-full h-10 w-10"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={{
              uri: "https://w7.pngwing.com/pngs/698/493/png-transparent-tinder-hd-logo-thumbnail.png",
            }}
            style={{}}
            className="rounded-full w-14 h-14"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons size={30} name="chatbubbles-sharp" color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* End Of Header */}
      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          // cards={profiles}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          backgroundColor={"#4FD0E9"}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swiped RIGHT");
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) => {
            return card ? (
              <View
                key={card.id}
                className="relative bg-white rounded-xl h-3/4"
              >
                <Image
                  source={{
                    uri: card.photURL,
                  }}
                  style={{}}
                  className="absolute  top-0 h-full w-full rounded-xl"
                />
                <View
                  style={styles.cardShadow}
                  className="absolute bottom-0 flex-row justify-between px-6 py-2 items-center shadow-xl rounded-b-xl bg-white w-full h-20"
                >
                  <View>
                    <Text className="text-xl font-bold">
                      {card.firstName} {card.lastName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text className="text-2xl font-bold">{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={styles.cardShadow}
                className="relative bg-white rounded-xl justify-center items-center"
              >
                <Text className="font-bold pb-5"> No more profiles</Text>
                <Image
                  className="h-20 w-full"
                  height={100}
                  width={100}
                  style={{}}
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKF0rxOfxJd4bZadjJmMvKKqyDt-sIrZiyQ&usqp=CAU",
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevations: 2,
  },
});
