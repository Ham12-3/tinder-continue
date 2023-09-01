import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import getMatchedUserInfo from "../../lib/getMatchedUserInfo";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
const ChatRow = ({ matchedDetails }) => {
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState();
  //   const { user } = useAuth();
  //   const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  //   useEffect(() => {
  //     setMatchedUserInfo(getMatchedUserInfo(matchedDetails.users, user.uid));
  //   }, [matchedDetails, user]);
  // useEffect(() => {
  //   onSnapshot(
  //     query(
  //       collection(db, "matches", matchDetails.id, "messages"),
  //       orderBy("timstamp", "desc")
  //     ),
  //     (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
  //   );
  // }, [matchDetails, db]);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Message", {})}
      style={styles.cardShadow}
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
    >
      <Image
        style={{}}
        source={{
          // uri matchedUserInfo?.photoURL
          uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgSFRUYGBgYGBgYGBgSGBgYGBgYGBwaGhgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISGjEhISE0NDQ0NDE0NDE0NDQ0NDQ0NDQxNDQ0NDQ0NDE0NDE0MTQ0NDQ0NDQ0NDQxNDQxNDQ0NP/AABEIAQAAxQMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAACAAEDBAUGBwj/xABBEAACAQIDBAgDBQUIAgMAAAABAgADEQQSIQUxQVEGBxMiYXGBkUKhwTJScpKxI4Ki0fAUJENissLD4ZOjFVNj/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAhEQEBAAICAgMBAQEAAAAAAAAAAQIRITEDEkFRYTJxIv/aAAwDAQACEQMRAD8A3OK0K0UgGOBFCAgICEFjqIUAcsVo8r4/GJSR6jmyopZjxsoubDifCBNaJrAXM1vBdMaFRC1mRgpbJUHAbtQbbiptyM0B+ltbN2jFi5N7A91eQ1vuPwi3CTa6dkEWWcUTpHiGqNVuc7n7RsxW27IGuFA5CV621cczs39oqXbQlWyg2sBZR3Rw3Dj5xtdO5ERpxbY/SvH0RftGqIDYpW79+YVj3hoOdp0XYvSNcSgKsUc6ZXtbN9023gnTgdRv4Nppslo1pW2fjhUBBGVlbKyngfPjoR63lwiVAQTJCIJgAYxEMiCRAAiCRJDBIgARBIhkQSIEdoodopRajGPHkCAhqsZVkgEBrRRzGJgDVcKCxNgNSTOWdIelKVMTUVhmohGpAC+Zw47zC/jfloq+c2DrE23RSl2Oc9rmV1RNd33+Q19wDaciq1iSDu3HwG4i3lJWpGSrO7WcsDYHKTYeu7f9TIMUpy2vqfHUHlyg0Fer3LFvL5aiZhOjVZtchJtw108eftM7kbmNvTFYPG9mLMNbi4O8efp9JZbaJzEWA0NvcEH5Wmcp9CsTUsCm61r8uWsyydW9YgA8gffgP65Sey+laSu0Mtxa4YqR6i5+d5LhseAbD4SLEbyL8COR4zbK/VnX+E7he/lymo7V2JVwzAurKAbXta9tQP0l9pUuNjfuh+2O0Z7sSdDfiTmIJ03m7f6ZvNLEKQpuAWAIBIvqL7pwDZ2LqoctMtxzZDbU2uL38F9pncPjMxAdWBFtWN203WYn2l3pnW3ZgwO6IiYXo1is9MAKAo0BzKSTxvbje9+MzZmoxQEQTDMEiABEUIiDaAxEAiSQWEoCKKKBZtCEUcCQPeGIAEKApR2lhQy5jUanbXMjBfe8vRnphgVYAgixB1BB3giBwHpZY4io4YsM5UMd7lbKSfUTE4DDtVcIPU+Am2dZ+Ap0cSiUlC5kDlVACrdmAsOF7EyHohgrXe3ETGWXri6YY+2TbujOwUSxyi+nCb3gMGo4bphtlaATY8Kb7p55d17LNThdooBuktzIxCJnRz0Z5guk2yExNB6bAXtdTbUGZ615UxCnKfKZTTzlXwfY1ilQfZvvuPIhhu9xLHb2YFFzWt9oXt775n+nuFUOXW4PgD8hymmJVbW5F/EW3b52nMcLxXXegGNNVXZqaIbgXp3Aa2/ukkg6jdNxKzX+gyKcKlRVCs6jPbS7L3cxHM2vNimoxe0eWMRJLRiJURGCZIRBIgBEYVoxEojtFCtFAt5YrQjBkCtHAiAhqICCx7QgI9pRzHrg2eMtHE21z9kx8LM6j5P7yp0aohUUcTqfUTZutXDF8CSPgq02PgDmS/u4mqYOuyqhW17KdfKcPL9O/hb1gKes2fDKBac8wKY096m4IPBj9ZsGE2xURlp4lMjHd91vIznJp6Ly2uShJj6btkzzA7SrV6jWXECil7a2F/G5+k3uRj1vw23dIK1iLGYHB4F1GdMQHa2rXzny36DwmSw9Vm+0b8ja2njJT1c76w9iuB2qPdCbFSN2/wDlOa06RNZaYGbO6jzubGxPDfO29N2/uzn7pU/rf9ZzjYGGVcbQYrcB0HK+dbi53Gzm48gJvC8OeePPDrWysCtGklJfgVRfmQAL/KXIVoxE6vOCNaHaCYAkQSIZjEQI7RiIRgmUDaNCjQLZijkRwsBAQwIwEMLAeKK0UDDdLsKKuDrUzxUa8irKw+YnNtlUi9NQPtZVHhynX69IOrI25gQfWc0w2Fag7UiLFWtbmPhPqLGcfLPl6PBzdDwmza7ixrlHV1Is2VQq/CRcXB/rnMlt3ZoCBlqElQt7X1e4uwvuG/eSd2szGAohtbn1lTpHVCqFG4387zn7caen11k2jZFbNh1B3lR+k1rHbJQOwdHZGQrcgsLHQkZTv/SZ7YelBD5azJLVBFtPI75ddM3/AJt1O2sbJ6M0UUdi9QMDfO1wdAAFtYAjT5mbAKJReBPh/Iy4oFtJSxJa/KMvtnHnj4al01q/3Z9PiW8k6PbGpmlRq5bvkVrneMpuB4bzJ9q4I1mWnvUupb8Kg3mbpIFC01+G9/DdYHxkw54aysx3UhEEyQiCRPS8ADBMO0YiBHGMMiCRKAMEiSFYBEALRQooFox1EK0dRASiHEIjAaKKOBAYTRelDhcZfmiN6jMP9om+TQunNH+8I3BqQAPirtcexHvOfk/l18N1kzez64Ki3Ka90prvo6LmIzC26x4fWLZFZlXXUA8IK7TpG+dgup37/QTzx7ZWV2B0gapR7NFPaWsocELmHBuVvnNjwi1XX9sqo4H2qZNieYB1t5zEbK2nhQAqh8wNwFRyWO7Sw1mRbpVg1sHqFCbW7RWW992pE6SM5W/EWMPj8pNN9GHz8RHxGKBNhK4xGHxBsrqxtcFSCfMESw2EVPa+vpMZbJZtBQYCotzYXbU+Rl3MDqN3D+f6zGIwasg8WPsp/wCplrTp4pxt5/NlzoMYiHaK07vOjtGIhkRjAC0AiSREQISIDiTESNlgRRRyIoF0CGI9orQGiikirAECPaGFj2gBlmudNdnF6AqILtRJew3lDo49LBv3TNmyxZZLNzS43V25p0fxyZjTfc27wP8ARMxW09lU0r9oFABbeLgj1GstdJKNGjiXpUWJCBXcaWpO+cqgI1+yt7W0BGp4XdnVFqgZrciDr7zy3eNe7DKXlf2figuXvP5ZifPUi/zmw4XApVs2Sw4ltSR4t9JXwGFpjWw0tblNgp1VAFvLSb3bFyy1/M1/gK9JFswUXUWBA4cpjcdijlJ4nQeQk2O2gid3TxmFqVGxD5VuFH2mHH/KpnOsYhw2JCOazA5E09Ld9vTT2M2Cji0d3pK3fplc6nQ2cZkcc1YbiORG8EDHY7DBaLoFvdCgUcSwygD1M1Ppzjn2fjsNiE7x/sqJUW9hUVHYMDyOoIPAgcLg9/F8xx886rolo1pU2PtSliaS16L5kb8ytxRx8LDl9LS4Z1cAxjCIjWgARBkhEEiABgESQwGgR2jQo8C7GMeK0BlEkAiQRq9ZEU1HdUQb2qMFUebHQQDEcCaD0h60cNRumHX+0P8AeBKUh+9a7/ui3jOZ9IOm2NxgKVKuSmdDToAohHENqWceDEiXQ7Jt7p3gcJdXq9o4/wAPD2dgeTG+VT4Eg+E53t3raxFRWp4aktAG47Rm7SoBzXQKpI8Da+h4znLC0iAiwdC6HbNfEYTEPcl2qklySWLBVa5O8m7E684eycU4PeGVgbMOF9xuJtnU5hB/Y2Y7mquxv4BV/wBsubX6NgV2emudHGa9PvAN8QNt19D6mc/JhxuO/gym7Ko4HazKLEE/MSxU2xUIsotwBO/0AkI2dl/6mVwGCW97Thv8em4/qPAYGpVsXJCnnvN/0mzUMKlNALAACR4cqvKSKrVmyC4Ufab6DxMSbZvH5EuzaHaOKpHdU90c2HxeQ/XynNeuVr4ukvKhf8zv/Kdjp0woCgWAFgBwAnDOtLEZ9oOPuJTT+HP/AMk9OGPrHjzy9sttT2RtPEYSp2mHcqbjMu9HA4Ou5h8xwInTNldZuHcAV6T0jxKftUHtZ/QKZy7LATef6/rfOkktZrv+zttYbEaUayObXyhrOBzKGzD1Ev2nnT6ajz4GbDsjphi8PYLU7RPuV7uPRr5l97eEXD6TbtMEiapsLp7hq1krfsH/AM5vTbyfTL5NbzM20G4BGoOoI3EeEzZoRmA0kYQDIoIo1o8IvATDbd6TYXBgGvUAY3yogLu1uSjcNLXNh4zHdY222wuE/ZkrUrP2SMN6AgszjkcosDwLA8JwYLvPiZqY7V0rbXWw7AphKOS/+JXIZx+FF7oPiS3lOe7S2jXxLZ69V6jc3YkDwUblHgAJBaICamMTYQkRSSRnFgT4Sm1Vhe59BBRdZMy6DyjYdbsJzqu59ANnt/8AF4Ya99qrsOY7Rgl/Cwv6+E2/CUcgykeUo9XFMHZmG/yo6/ldx9JsdejpcTUvwzWKxGEDjUajc3Hy8Zi62EZd0zpPy3yvitRPP5cZt6/DlZjpS2Nhu0YhibDU+Ph4TOvSyLZbAC9gotYfU+Mw2Fxq0Gu32TofDXfNjZQwHLfNeLUjHmuVv4r4LFZrqftD5jnOBdM6+fH4pv8A9WX8nc/2zvLUsjB+HHy4zzhjMR2jvU++7v8AnYt9Z104RC0i4yRpGBrLOwVo4EYwhOzJ7TMbB6S4nCaU3unGnUuyeJUXBQ+II8bzDXivM2bHVtkdYGHqkJWU0GPxMc1Mn8dgV9QB4za0dWAZSGUi4KkEEcwRoRPPpMvbN2/XwzK1KowVWJNMsezfXvBk3a2te1xMXD6XbuhEUhw1cVUSqmququp8GAYfrFOaue9c9b9phad9y1Xt+JkAP8J+c5jxPmZvnXDiM2Oppf7GHT3ZnY/LLNDb7R9P0E3j0FHMYmIzQJYq40tzIESx629fUxehE40j4Je9E26Pg9/vMK9NdBcOE2fhgPioo9uRqKHNvMsT6zPjUSnsWlkw9FPu0qa/lRR9JemUY7EJlOb38RxlPEC39c90zbKDKYwQJ13DcOY36+G+TKe0dPHl63ljMHs3tGDuO4DoPvH+Uz4FhYQook1EyyuV3WI6VYjs8HiKgNitGoQRvvlNreN55wG4TuvWnicmz6gBsXZE92DN/CrThU3OmCaDxjtGG+WdhGEYJEdjOzISYg0RgwGqPlBMhqmwA8NY7m7Aep9N3z/SR4htbTNHb+gNftNn4ck2yq6fkdkHyUe8aY7qnqFsEw4LiKijyKU3/VminJpqnXBhymPWodz0UI81LoR8h7zR6h1B5r+hma6dbYOKx1aqDdFbs6fLJTuoI/EczfvzBOdF9RLj0DEUZd0e00CWPUOvkIyxmOpkvRAvDwnHyMB5PgUubc9PeZV6xorZQOQA9hJYopkCwhSMHU+H9fykkBRRRQOY9c+I/ZYelf7VRnt4KpX/AJBOTmb71v4nNi6dL/66Wb1djf5Is0GaSBaMsIiKXHspEwWMcxmM7MmBguYlkNZ5kKmd7enoP+7yqzXOknfuqBxlZ7gXkqx1fqdxACYlCwFnptZjYd5WFxf8PyEU5Kld1vYkX32uL25284pjSp9p4fs61Sn9yo6fkYr9JXZtB5yztLFirWq1bW7So725Z2ZrfOU2/lCrCGEJGu6GDKh1iB3+cQMZN3rJkGaWsC1jflr7Ss0mw3HyMivW8UBGuAeYB94UyApcTzJ/l9IcCj9kQ4oURikGMrhEao25VLHyAuf0iDgXTnFdrj8Q17hXCDwyKEI/MG95rxEmrVS7NUb7Tsztb7zks3zJkRE2hrQYRgMZce0p5E5hXkNRptD5pXZrsB439oZaQod7egihVqusFWBNyD9IaJxMaudyjeZGiDiKQmlaPJumgFYDSVpA5mKqe8cGRgwppEojU93rEIycZKCaS4bfImh4c6iRXqzY1XPQouNQ1Km1/NQfrLs13oBiRU2dhWHw0xT/APETTP8AomfqmynymQ6bh5CHFGMB5qXWTjuzwFYDfUApW3aVGCP/AAlptZM5R1w7RuaGGH3mrNruyjIlxxBzv+WWJXNTrGtHvGMoaQuZKx3mVy01ilIyu++SF5XZ5uoTmHRTQX8/eQM0nRTYXPtJGhuZXNTU295O5kYZbS0AFvrFExJikFdhI3EkYyNpzqkjSWQKZKDEokBjodfOApj31Et6RKYVI6xiIIOsivQXVDiw2AycadWov57VL/8AsPsZutc6AcyB8xOS9SW0O/Xw5P20Soo8UOV/cOn5Z1rEfD+Jf1EnylTxiY8YiRUdRhaefenW0O2x9dgbqhFFCOVMWf8AjLztfSjGDD4ariD/AIaM1uZA7q+psPWecbk6sbsSSxPFjqT7zXwzEoMRaRho94UNZpXdoVRtZC5m50lMxlYmTOdJAxikMxl1DoJj3aW0bugxKtSMIDwDUiWp4S7CKmKOxvFIKpgNDJgGZVGJOsgkiGZgkiJjXjzQmVtIiZHSPCFINw6s9odjj8OxNg7dm3lUBRR+cofSeicR8P4l/WeTsFVZHDKbMpDKeTA3U+hAnqTZ2OFehQrjdVWnUHhnAYj0vaErJxExQahsJlXNOuTamWhTwoOtWpmYf5KVm/1lPYzkTGbP1j7S7fH1AD3aIFJeVx3nPnmbL+5NVvNVIO8Z3sIMjdtbcpZNgWMiJhsYA1m2QtK7ydzvlZ5K1AOZcwxuoB185RYy1hzpM49lWyBykZPKGDBM6UAVjQ8sUgpwDESRETeYVGY6xjHWZEghAwBHEoIGxvJSZFCRrjylEqGxneuqfana4JaRPeoVcnjkfvofK7Mv7k4FOhdUW1ezxi0ie7XGQ/jS7ofbOP35Erv0xm38euHw9Su26mjMfHKCbeu71mTvObdcm1MmGTDqe9WcXsdclOzsfzZB+9JC/TjdSqzEu+rOzO55s5LMfcmCDBJjyqdmtrISY7tc25b5GxmsYlM5jRiYLNNAWbfInMcmAx0mbRGTLVJTbSDjcMabZG0OVGIIsRnQPYjmM1oWHbSTEqZH5x2ERaCDNhipihx4H//Z",
        }}
        className="rounded-full h-16 w-16 mr-4"
      />
      <View>
        <Text className="text-lg font-semibold">Elon Musk</Text>
        <Text>Message</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffsets: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
