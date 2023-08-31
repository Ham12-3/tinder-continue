import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchedScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  // const { params } = useRoute();

  // const { loggedInProfile, userSwiped } = params;
  return (
    <View style={{ opacity: 0.8 }} className="h-full bg-red-500 pt-20">
      <View className="justify-center px-10 pt-20">
        <Image
          style={{}}
          className="h-20 w-full bg-red-500"
          source={{
            uri: "data:image/png;base64,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",
          }}
        />
      </View>
      <Text className="text-white text-center mt-5">
        {/* {userSwiped.displayName} */}
        You and Sonny Sangha have liked each other
      </Text>
      <View className="flex-row justify-evenly mt-5 ">
        <Image
          style={{}}
          className="h-32 w-32 rounded-full"
          source={{
            uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgWFRUYGBgYGhgYGhwaGRgaGBoYGBkZGhkcGhocIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHjErJSs0MTQ0NDQ0NDQ0NDQxNDQ0NTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xAA/EAABAwIDBQYEBAUCBgMAAAABAAIRAyEEEjEFBkFRYSJxgZGhsRMywfAHQnLRFFJi4fEzghUjU5KiwhYXQ//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACQRAAMBAAICAgICAwAAAAAAAAABAhEDIRIxIkETUQQyQnGB/9oADAMBAAIRAxEAPwDsyEIQAIQhAAhCEAIhISqjGbaa2zBmPP8AL58fDzQNS36LhQMRtak382Y8m39dPVZzE457/ncY5CzfLj4qPCDWeH9l1W2+78rAOrjPoP3UKptWs780fpAHrqoSiYjaNJk53hoGpOnmg1USvonuxDzq5x73H902XdVkdo784dhLaYdUItLRA8Cde+6x21956tYxnNNp/K0y4/qfYnwsgHSR0Pau9eGoWL87h+VkEjvMwPNVP/2PBltN7Rwl+WfLRc5JE3JnrPqprMIxzS6zQOOYX7s6DOrZ0vBfiYIl2cHkcjgT+qfeFodmfiBSqHKcpdFxOUj/ALrFcOAYwxmcOdmr251M/MdbzHugnU/aPo/CbxYeoYFRoPJxHuDCtmuBuF8tUXhrmljiD/SSPYytVsffzE0HAEl7NCPzDvB18R4hBLlP0d9QsdsHf3DVw0F4a93C+vLLqPVa6nUBAIIIOhBkHxQS017HEIQgQIQhAAhCEACEIQAIQhAAhCEAIouMxjaYlxvwA1Kj7T2kKYgXcdBy6n9lmatVznFziSTxP3YINY4/Lt+iTjtovqamG/yjTx5qIgJYQbpJdIFXbY2vTw7czzczAEZjGsTYd5TuPxzKYl5gX4Gey0uI8gVy/e/a7qj2Oy5QJLAbkgxBI+Xh/dA6eIutob306nZyPDORyw4/1QXWHLuWV2htBzzla9xB0mA0DhF5iLXUSlWLpc8lztADoB7AJWwA55dfgBqSeAtb170jGqbIjtbST7/sFKw1IAZnETNhqf7JgTrP33pzDVnAzJ6Xsgz0tX4QZcxGQnjky+pufGFX12M/IHuPC3NXGGxLnxnJd3NbHi6JlSXYZkEgXuJFgPG0/eqYjMMwsntR9PMmJXqYMBoPQHXyUuu/KYAF7W8tZsvDaDnHM1wMHVrgYPfw7iPJAEdlNzxLQOREwbXt5pXYc3JcbeJH7juUqoC5snIXcYhrp5lto7xa/eFBfTIEyfXXjoEAevjPEOmSOIs6RoTB15FdJ3H38IinUdBsJd8ru8c9LrmD39wtcD7uvTKgEHQg/VBcv9+j6r2fjW1WhwEdP2PEKZK51+Hu2c9JjQc0NIPDKRoBPD9lv6VWdVmuTXjK5uLwfXofQhC0MAQhCABCEIAEIQgBFW7V2iKYgXcdByHMqRj8WKbS466AczwCx9aq5zi5xkm5++SDXjjy7foRzySSTJNyTxKEiUIOkVDikT9PDucDA4W6lJtJawS1nNt59sgPBjPDySyYaQwFoBPEEkOsOh6YTFYpz3ue8y4mTy8JWm/ELCtoYkUwZdka9/Rzi6w5Wy+axzjJST1aY8rx5o81xOt/byQQTrMrywakcF6DDzTMj26o6I4J/D4Vzr9lo5uMDzKWjhrTcnkGmPMqQA8ESJI9BylGoeMl0cK4CW5jaxaCG+JOqdqVXlp+IwxFi1pJgczPopmyMBXqGYcQLxAa0d+s+PkrnFbpVasEvIjhJjwsk7lDXHT+jJUcSwggOLY4lrrfquBHcUxVrBpDmjTj+Uzz5zcQZC1jtw3ASXjrb3TL9yiPzidY6WnhCXnI/wAVIxtapmMxzMcOduncmX1TAnTSRMd1/qtdjN1Gsbmc6J5Anh3/AFWaxlECwM/X7+iarSKloiuHNLIXjKeX33JtyYjX7m7ffRr08zxkBgzGkRrqBBXfNn4xtSm17CCDyM+oXy1h8Q5hBaSCCD1supbg7zOcx1HOPikyA6IIgDs83C9vFY8k58kdkNc0qW+1639HZKNWU8qvDOAaINgBfmp1GuHd41Vcd70zluMfQ+hCFqZghCEAIkJSrP73bT+FRIBu4GejRr56eaByteFNt3bLC4uc4BjbNk8OJ8f2WXxW+WHZYOzd11zna21H1nlznGJsOACrSUHR5pLJOiVt/m/lYT5KG/f9/CmPP+yw0oTJ/JRsnb+V+DG+ZT+G/EfEtEZGHvlYdClpPph+Wl6JO39qOxOIfXeAHPyyBMSGho16AKsYPVO1hafuy0my9hANaXCXETHJJtShTL5KKjC0BkOawMXPSSe/QK02Jsv+IqNOUik10X1cQC4k9YaR00U3/wCJ1nuEua1hOoBLoJ5aeq2uytlNouYwC2V5A1EjJfvg6rOrX0bTxNPtdFa/YpmGtGkDkPopWA3YaSA7vc4cNDDZGp5nhfUiNRTw+ul1Ko0o+/u6x1m7wYw+Da0BrGgAWH+TqepUxmG6L0xil02oSIqsI38LwItyUXEYMH76K1eEy9VmEKjmG+VIsOUWBDie4EG1uebTmFgsTaZFz6SeP3xXa94dnte2S2Tw4rle8GzzneRwJ8/uVrD+jPlX2ZsVE065T1eiQYjSyZcFoYHlTMA5we1zCQ5pBBFiCNCFDLdFdbt4Q1KoYAe1aw8fogcbvR2nYO1nVMPTeYBLQDGmZtj6hW2zsS7PJP8AjiFTbKwop0wwcJ9VMBgyOCPFZ0dflvs2rXSJC9Kq2RiswjxH1CtUJ6jjufF4KhCEyRCuTfiLtMmm8g/Mcrf06D9/FdI25XyUXRq7sj/dr6SuN/iHVhjG8z7BBtxzidHPHFeUpSJkghCEgFQkSpgSdn4b4lRjOBcCe4XPoF0LC0gXwueYR72mWTn0EXPVSG7UxNMzmeD1H7rOp8jfi5FK9HX8NRbAAKfbSc57HQYZmk8Dnyj6LnWx983tj4jQ7qLX7lvtj7bZWAykaTCxcNGy5FRdMZwT4Ym2OvK9VcbTYO29re8qfEGyRTpp9ghUx3kww1qM7gZ++PkmG764IOymsJ49l0T3xC0UmNUaEhMOVWN7cMZIeY5x5JzC7ew1T5agBj81p8dEnLFNIfxFIOEfYXOt7dnFjjazrg8CfZdLlQdq7NbXY5jgL6GJSl4yqWrDibqWYaCYE+guOcyVBxOFAuOJ06QFf7a2dUw1Qte05ToRoRrrz0VbXc2LCLADu0Hv6BdCenLUtMq34ewtx1W9/DbZdnV3C12M8D2j6gLGgF4jjp1Jldf3d2f8DDU2HUNBd+p13eqo0419lmUiVImanuhXcxwc3gZjmtjSqBzQRoQCO4rFLR7v18zC3i0+huPqk0Z8q1aW6EISMDM70Vu0xvIFx8bD2PmuQ/iLU7bB3ldP25UzVndIaPACfWVyb8QHzWaOQ+qZ1Z48ZkkIQkYghCEACEITAs9hGKh/Q73A+qu6uKnstaHHjMQO8lU2wWnO8tEkMOpjUj9lLpPqgPcHNYWNLgMocXeJssqWs6ON5J7xezSBmLAAdcp+inbr1AyoIMg6d/UKXuziq2JL6b2sdlYXiWuYXZXNae02Ro6bj8sKia8srnLI7Wh1F48e9S00uy5c09SOzbPeXKFvJsQVgOBuLcJBE/fJWO7tM5ATqQPZT8YQJPJZp4tHX9sMCzdctzEviZEcgXTqL/4Cp6m6VMOvVc0DTK0SPNaXb22G0wZN+psO9UuA3hoF2V9Rk6doO1n9MBNVT9B4R/kTcDuzScADWqOsRJLZvGtuimYzdAZf+VVPc7Q9BERw8lKZRpVBnZkcP56T2mON8ht4hTcNUcyxcXDgYun50vZL4pforN16uIpPNCuS5sdhxGkcOcdOHCy1pMC6ifw4fB0cLg6p0uJMHhZS3vYlOdGT35Y1zLi59pE965xj6UMJFoiOdgui76GzB1cfYfVVGw9iMrBz6nyZrDiY0HXgtJrJIqfKsM1upserUqsquaRSa4Ek8S0zYcRYXXW2ukSFUbda6jTGQ5I4CPAf2U7Z7iabc2sX7+KqL8nho+NTKaJKQpV5K2JBWWwauWrH8wI8Rcex81WJ7B1Mr2u5Ob5Tf0QKlqw2qEiFJymCxjpe483OPm4rlO/TpxHh9V1BzpJPVcv37bGI72/VM7eVZJmUiJQkcgqRCExioSJUhGh3Yoy17uZa3yBJ9wp9aiW3BImx4+YOqc3Op/8AKJ5vcfRo+ivMRQGqwqso7+OE4Rm/4kUmFtOQXa5ezPKQ2B5pN2dlOrYhkiwOY9wv+ym16AJWy3I2eAC+NdO4JeXRfgp7NlhaQYwAcAmKhk36qSTaE05iTRgvbZhdvUy157DXHNYvbJ/2uGhj7KylLYzvjh4eGDOHZjJLDmzAlmUh5E+PHVdZ2hs5rxcAg/d1WUtjhpsY77jzTVOWW1NT2R94Bha3bZ8QVYAD6QyE5bQ60HUWjkk3eZWLYqiYsHSJIFrgD5u6yuKWzW8Y4el/dTGACzR5IdeXshJSsR6ZTyiyYAUhxsowKhgjJb8jss5S72ClbPw76VNkNBDTBEwZ4kRxBjyXnbrQ/EUmcJk+BDo6/KVe5G5XAWA7Q7+Mqn/XBr+2lNvEwvptEH/UZryLgD7qfhxDR5+aTHNkMHN0+AH+E4tOGfsd10kBKQolBW5mBSSklEoGa3/iAQs1/EHmkSMvxoguF1QbzbvNxLZmHjQrSYlsPcOTnDyJTTtEju8VU9nC9oYN9F7mO1byUVryr7eh84ip3qloOsRxKDzqnKaR4FRKKqtMPSaGEkBQmUA46IBy0MiqEvxAlxLANF4ZTsgnvTe7muHwAf63+6t8VVWc3UqZaJHJ7vUBWdepaVz0vkelwv4oKbS94aOK6nsfCBlNo5D1WF3WwILmvPG66TRpdkRf6IS7FzV0MuTZfC91WwmHMJFtbX7lLM0PVKlgmmAymH4qPn0FieUfRTKLmuEg2Q+2H9Uem0AdQnBRAUhkQvFVyrxSRn5NsjVlDdaVKKrNoYjKPIeqgpFHQdnxgcT2W5j5CPeVPfXeWkZMgkuJJknj3BV+ymZqzzyafMu5KZiWuccpcSw6jhHVNsuUeMPiPiPDgDkbLWk8Y+Z3dMeSnSo+GZA9u5PSujjnJM6evoWUkpJSErQkUlJKSUhKB6SPglC0f/DUJGfmih2tSy1n9TPmAfclQKvynuKv946Pba7m2PEGfr6Khxxhjj0Klnpfx/lxJnFduPmrUP8AUVX4Vt1I2i+XPPNx91EpPhM8un82yfWqWgKRQpQ2VAwnaerTFvythBa77KbEGXLyTwTjKZOgJ7hKkYXZdZ7hlpPP+0geqDLG2XewamQZT+aCO/T9la410MJUV+xK7GZiwgMEm4kDivNeo59EkagXWVz3p2RWLC83P2uxrwxxvHZ/bw+i6XQxha2ZEceULhmGp0yGjPleYjgcwMW6z7rQt/iXtysxL4sMpdkMcs0T68VLnsfbXa06MdsZiS0SOZt6apBtF775gByjtGNdTAWL2VsfEMhzntAM5mZswA4Rz5FaOngD8xe2/C/ibjXRClEtP9F01zHN1mb8OPNUrK7sNUAJmk8wP6Hfy9x4KU2kQIkHWYdzv7qu2q45Mrx2DIJPCdCOOqVIctr2a6hWkSkcZWf3Z2gX0yHGXMcWOPUaHxBB8Va1sYG6qd+iXOPokVXABZbGYsOf0tHv996ssRii4WkagdZGvesxtHEtYwu1ABFud+ScrsPRUM3sGGxL5YXscADBGYEcpsVaY/ekvqUqdNmVryMznfNl1ygCw71zbH1MzySZlaNv+vhv9vst1E+zD8tbiOlyklASFaGgspCUiRACpzCMzPY3m5o8JEpmVabvUc1YH+UF3/qPf0QTTxGvQhCk5iu21QzUzzb2h4a+hKxG3HZaNQ8mn2XRyFzn8QmfDw9X9Jjx0SZ6H8Ll9w/9nDMSUyG2UulhH1ntZTaXOPLh1J4BdM3Z3KZRAfVh79f6W9wTOVS6Zi9293a9UyGFrf5nCPIcVtsNuXREGqS88tG+S1eQAQBCackbzKSwh4fZ1GmIZTa0dwT1hoAF6cm5QWI8A2NxxHNYerhhQxD6R+RwJbxkEafTwW56+Xes/vbhZpNqj5qbgT1abH91L7E/2YarhH2MZXNdmHMTcesLdbqbUw+IrfArtDXtaXDgx05TDSTIdc28is3SdmcZ4gcIUp+xG1HUqjYlrm5xa7efUj2JU5pcy6n4nXsDsqhLjlzAG0uJAGUde/VeWVsLlZkax8nVoDiBe5PlZZo4QNpuDLS3LbmbekqbhiykyXENa0fcKsI/C/bbPO9GP+FRe9lGnIILS5ggtESC0QdeRC5pu/Vx2IcSajzTOfNmjJlAMkNi3aIFvotnicPUxxIeCyg0yQbFwka37rC+mitW4JlGk7I0ABp5CGtFh0CVYkX4JFNuST8Os4/9SO/KxrfornEPPE6CPYhQt2aQZhhe5JceuYyV6xNUXPCJjiYNo8Fj7ZL6R7xGJOSRoAJ71j97MSfhuA4CTyvAEeforvE4kgEl3Zg+HEBVFXBfEpuzj/UM63DR8vqSfJWuuyGvLpGFrnTuWm//AFwp/T7BU20NmVGOgMc4C0gE+yt3CKmFnXs/RdEvTlcua7OmDRC8tNgglM6BSvJKCUhKAAlajdehDHPP5zA/S23uT5LL02F7g1uriAO82W/w1EMY1o0aAPJJmXI+sH0IQkYnlYb8UdlVa2HHwhJzta7oxx+brBjz6LcrzUYCCCJBBBHMHVBUW5eo5du/sNmGYA0S8/M7iStCGQE7UwDm1S0/K27TzB08eCKmqZ0eS+iM9qYqCFKfwTNViCkyIBZMcVIcmXhSaI9EXA6Ss7vrUORlMWzuv3N/vC0gHa8As5vbhyX038AHN8TB+imniGlrwyOAqGb8LHvC0Wy8Rld/SfRZ80QKpboScw5X/vKlhzmHsmDx4g94U6Pjpz/w3VN4IjM6OhUnC4Vky8OfyE8fFYvDbeLTDmAnpYLT4Daz3ZQ1gaDx4p+Ro+VNYjQt4SIA+VoFgou0X5muYdHA/wCErCQM0yUziHWBsJ56SDyWdVpn6GPlYGtsQ2PLgfJM4kgARBER4W/yhhzHUm7vDl16Jl7CXZRF/TqYtZJENkH+GNR8Scn5z7Ad6dxbBwFhZWgpBrYH9yeZTuztk/FdLrMBv/Uf5R9Uu6eIeqVrIWwti53Cq8dkXYP5jzPQJd4dgMqPZUacj2OBto4ToR9VsHsAEAQBYBV1dkrqmfFYc1U6esrIhISvdZ+VwA8V6fRm7fJUWmMykJSOBGoTmFoOqOaxurjHcOJPQBAF1utg8zjVcLNs39R1PgLeK1aYwmHDGtY3Rojv5k9Sbp9Sc9Vr0EqEIJBCEIAjYqhmbHEaFZt7SCQReYhaxV+PwYd22jtAac/7plzWGcqM7UBeqjE9h2S4uPC3jxXpzEG2lTWYo5VpWpKE+kkXNDXI+CbxdBr2FjhIPp1TuUpMpU4XpgtvbOfRe1+rflDh5gHkdU7s7K8gESDAnUyPotftDACrTcx3EW6EXB81iG034d5Y9pBB8COYPHVTU9dEuvlrLt+wWEZhY8ROsXtOqtdn4Om3iSNAJm8D+/qqZm2JbBbqLRMyRrKtsNjpa0kgcTHATaB/jTzjWvZaa+iyq1BnaxnD5j08eZUXaOLDZb+YyNREweHgFDGIDXF7jM6DS+g07/MFecHs6piHB2R4piIOVxLjocttOvQIz7JqvofoZjDWDtGJ5DjM6f4Ks8PhQway43Luf7BWWD2M8CGsyDiXG56kayrbDbKa27u27roO4ful4UyXcz9lRgtlF/af2Werv2HVXjWBoAaAANAFIITTwtphSc9W6fZEqie73UDEugEqbiKnAXKiPpTdysEVnw/zFemPuE7iTCgCuAZKotdlr8EPsR48Vd7F2UKILjdzv/FvL9/Dko+wcI4gVHiBq1p1/U76DxV+pZnVP0KhCEiAQhCABCEIAEIQgCDjMJmuLH3/ALqsczhx0WgTFfDh3Q8/3QVNYUT6SjVKKtqtAt1H7Jp1JM0VFR/Do/h1a/CSfCQPyK1mHHJJitj06rctRgcOHMTyIuFaMownmU0hOjE4rcMOJNOqWzweJA6AiLJqluZiWuEOYR0PXr0hdBaxPNCWInya9GY2buaxt6zviG0N0aI91qWUoAAsBYAcAvQK9ZwjCW2zzkSEL0Se5M1HgdSmAPKh1Xl1m+aeLHO1sOS9CmAgCGKQHeo9dym13wq5zHPOVgk+3U8kxoq8Y+bK02Hu/cVKw6tYeHIuHPp5q02dshrDmd2n8+A7uvVWqBu/pAlQhIzBCEIAEIQgAQhCABCEIAEIQgDw4A2Kj1ML/L5KUhAFY5kaheIVq5oKaOHHCyCtIHgvbQVI+AR1S5TyQGjIYea9hnUr2vLqiAPYYkc8Dim2yU4ymAgDwS49B6oZTATpBShhQA2Uw95NgJUz4I4r2xgGghAtK5mALruMDkNfPgp1Ki1ohoAH3qnUIDRUIQgQIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAhCEAIhCEAN1VE4oQgaH2J5qEIA9IQhAhUIQgAQhCABCEIAEIQgAQhCABCEIA//Z",
            //loggedInProfile.photoURL
          }}
        />
        <Image
          style={{}}
          className="h-32 w-32 rounded-full"
          source={{
            uri: "data:image/jpeg;base64,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",
            // userSwiped.photoURL
          }}
        />
      </View>
      <TouchableOpacity
        className="bg-white px-10 py-6 m-7  rounded-full mt-20"
        onPress={() => {
          // navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text className="text-center text-2xl font-extrabold">
          Send a message
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
