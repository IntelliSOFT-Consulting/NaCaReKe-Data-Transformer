const subCounties = [
  'Ainabkoi Sub County',
  'Ainamoi Sub County',
  'Aldai Sub County',
  'Alego Usonga Sub County',
  'Athi River Sub County',
  'Awendo Sub County',
  'Balambala Sub County',
  'Banissa Sub County',
  'Baringo Central Sub County',
  'Baringo North Sub County',
  'Belgut Sub County',
  'Bobasi Sub County',
  'Bomachoge Borabu Sub County',
  'Bomachoge Chache Sub County',
  'Bomet Central Sub County',
  'Bomet East Sub County',
  'Bonchari Sub County',
  'Bondo Sub County',
  'Borabu Sub County',
  'Bumula Sub County',
  'Bunyala Sub County',
  'Bura Sub County',
  'Bureti Sub County',
  'Butere Sub County',
  'Butula Sub County',
  'Buuri Sub County',
  'Changamwe Sub County',
  'Chepalungu Sub County',
  'Cheptais Sub County',
  'Cherangany Sub County',
  'Chesumei Sub County',
  'Chuka Sub County',
  'Dadaab Sub County',
  'Dagoretti North Sub County',
  'Dagoretti South Sub County',
  'East Pokot Sub County',
  'Eldas Sub County',
  'Embakasi Central Sub County',
  'Embakasi East Sub County',
  'Embakasi North Sub County',
  'Embakasi South Sub County',
  'Embakasi West Sub County',
  'Emgwen Sub County',
  'Emuhaya Sub County',
  'Endebess Sub County',
  'Fafi Sub County',
  'Galole Sub County',
  'Ganze Sub County',
  'Garbatulla Sub County',
  'Garissa Sub County',
  'Garsen Sub County',
  'Gatanga Sub County',
  'Gatundu North Sub County',
  'Gatundu South Sub County',
  'Gem Sub County',
  'Gilgil Sub County',
  'Githunguri Sub County',
  'Hamisi Sub County',
  'Homa Bay Town Sub County',
  'Hulugho Sub County',
  'Igambangombe Sub County',
  'Igembe Central Sub County',
  'Igembe North Sub County',
  'Igembe South Sub County',
  'Ijara Sub County',
  'Ikolomani Sub County',
  'Imenti Central Sub County',
  'Imenti North Sub County',
  'Imenti South Sub County',
  'Isiolo Sub County',
  'Jomvu Sub County',
  'Juja Sub County',
  'Kabete Sub County',
  'Kabondo Kasipul Sub County',
  'Kabuchai Sub County',
  'Kaiti Sub County',
  'Kajiado Central Sub County',
  'Kajiado East Sub County',
  'Kajiado North Sub County',
  'Kajiado West Sub County',
  'Kalama Sub County',
  'Kaloleni Sub County',
  'Kamukunji Sub County',
  'Kandara Sub County',
  'Kanduyi Sub County',
  'Kangema Sub County',
  'Kangundo Sub County',
  'Kapseret Sub County',
  'Karachuonyo Sub County',
  'Kasarani Sub County',
  'Kathiani Sub County',
  'Keiyo North Sub County',
  'Keiyo South Sub County',
  'Kesses Sub County',
  'Khwisero Sub County',
  'Kiambaa Sub County',
  'Kiambu Town Sub County',
  'Kibish Sub County',
  'Kibra Sub County',
  'Kibwezi East Sub County',
  'Kibwezi West Sub County',
  'Kieni East Sub County',
  'Kieni West Sub County',
  'Kigumo Sub County',
  'Kiharu Sub County',
  'Kikuyu Sub County',
  'Kilifi North Sub County',
  'Kilifi South Sub County',
  'Kilome Sub County',
  'Kimilili Sub County',
  'Kiminini Sub County',
  'Kinangop Sub County',
  'Kinango Sub County',
  'Kipipiri Sub County',
  'Kipkelion East Sub County',
  'Kipkelion West Sub County',
  'Kirinyaga Central Sub County',
  'Kirinyaga East Sub County',
  'Kirinyaga North/Mwea West Sub County',
  'Kirinyaga South Sub County',
  'Kirinyaga West Sub County',
  'Kisauni Sub County',
  'Kisumu Central Sub County',
  'Kisumu East Sub County',
  'Kisumu West Sub County',
  'Kitui Central Sub County',
  'Kitui East Sub County',
  'Kitui Rural Sub County',
  'Kitui South Sub County',
  'Kitui West Sub County',
  'Kitutu Chache North Sub County',
  'Kitutu Chache South Sub County',
  'Koibatek Sub County',
  'Konoin Sub County',
  'Kuresoi North Sub County',
  'Kuresoi South Sub County',
  'Kuria East Sub County',
  'Kuria West Sub County',
  'Kutulo Sub County',
  'Kwanza Sub County',
  'Lafey Sub County',
  'Lagdera Sub County',
  'Laikipia East Sub County',
  'Laikipia North Sub County',
  'Laikipia West Sub County',
  'Laisamis Sub County',
  'Lamu East Sub County',
  'Lamu West Sub County',
  'Langata Sub County',
  'Lari Sub County',
  'Likoni Sub County',
  'Likuyani Sub County',
  'Limuru Sub County',
  'Loima Sub County',
  'Loitokitok Sub County',
  'Luanda Sub County',
  'Lugari Sub County',
  'Lunga Lunga Sub County',
  'Lurambi Sub County',
  'Machakos Sub County',
  'Magarini Sub County',
  'Makadara Sub County',
  'Makueni Sub County',
  'Malava Sub County',
  'Malindi Sub County',
  'Mandera East Sub County',
  'Mandera North Sub County',
  'Mandera South Sub County',
  'Mandera West Sub County',
  'Manga Sub County',
  'Manyatta Sub County',
  'Marakwet East Sub County',
  'Marakwet West Sub County',
  'Marigat Sub County',
  'Masaba North Sub County',
  'Masinga Sub County',
  'Matayos Sub County',
  'Mathare Sub County',
  'Mathioya Sub County',
  'Mathira East Sub County',
  'Mathira West Sub County',
  'Matuga Sub County',
  'Matungulu Sub County',
  'Matungu Sub County',
  'Mbeere North Sub County',
  'Mbeere South Sub County',
  'Mbita Sub County',
  'Mbooni Sub County',
  'Merti Sub County',
  'Mogotio Sub County',
  'Moiben Sub County',
  'Molo Sub County',
  'Mosop Sub County',
  'Moyale Sub County',
  'Msambweni Sub County',
  'Mt Elgon Sub County',
  'Muhoroni Sub County',
  'Mukurweini Sub County',
  'Mumias East Sub County',
  'Mumias West Sub County',
  'Muranga South Sub County',
  'Muthambi Sub County',
  'Mvita Sub County',
  'Mwala Sub County',
  'Mwatate Sub County',
  'Mwimbi Sub County',
  'Mwingi Central Sub County',
  'Mwingi North Sub County',
  'Mwingi West Sub County',
  'Naivasha Sub County',
  'Nakuru East Sub County',
  'Nakuru North Sub County',
  'Nakuru West Sub County',
  'Nambale Sub County',
  'Nandi Hills Sub County',
  'Narok East Sub County',
  'Narok North Sub County',
  'Narok South Sub County',
  'Narok West Sub County',
  'Navakholo Sub County',
  'Ndaragwa Sub County',
  'Ndhiwa Sub County',
  'Njoro Sub County',
  'North Horr Sub County',
  'Nyakach Sub County',
  'Nyali Sub County',
  'Nyamira North Sub County',
  'Nyamira Sub County',
  'Nyando Sub County',
  'Nyaribari Chache Sub County',
  'Nyaribari Masaba Sub County',
  'Nyatike Sub County',
  'Nyeri Central Sub County',
  'Nyeri South Sub County',
  'Oljoroorok Sub County',
  'Olkalou Sub County',
  'Pokot Central Sub County',
  'Pokot North Sub County',
  'Pokot South Sub County',
  'Rabai Sub County',
  'Rachuonyo South Sub County',
  'Rangwe Sub County',
  'Rarieda Sub County',
  'Rongai Sub County',
  'Rongo Sub County',
  'Roysambu Sub County',
  'Ruaraka Sub County',
  'Ruiru Sub County',
  'Runyenjes Sub County',
  'Sabatia Sub County',
  'Saboti Sub County',
  'Saku Sub County',
  'Samburu Central Sub County',
  'Samburu East Sub County',
  'Samburu North Sub County',
  'Samia Sub County',
  'Seme Sub County',
  'Shinyalu Sub County',
  'Sigowet/Soin Sub County',
  'Sirisia Sub County',
  'Sotik Sub County',
  'South Mugirango Sub County',
  'Soy Sub County',
  'Starehe Sub County',
  'Suba South Sub County',
  'Subukia Sub County',
  'Suna East Sub County',
  'Suna West Sub County',
  'Tarbaj Sub County',
  'Taveta Sub County',
  'Teso North Sub County',
  'Teso South Sub County',
  'Tetu Sub County',
  'Tharaka North Sub County',
  'Tharaka South Sub County',
  'Thika Town Sub County',
  'Tiaty East Sub County',
  'Tigania East Sub County',
  'Tigania West Sub County',
  'Tinderet Sub County',
  'Tongaren Sub County',
  'Transmara East Sub County',
  'Transmara West Sub County',
  'Turbo Sub County',
  'Turkana Central Sub County',
  'Turkana East Sub County',
  'Turkana North Sub County',
  'Turkana South Sub County',
  'Turkana West Sub County',
  'Ugenya Sub County',
  'Ugunja Sub County',
  'Uriri Sub County',
  'Vihiga Sub County',
  'Voi Sub County',
  'Wajir East Sub County',
  'Wajir North Sub County',
  'Wajir South Sub County',
  'Wajir West Sub County',
  'Webuye East Sub County',
  'Webuye West Sub County',
  'Westlands Sub County',
  'West Pokot Sub County',
  'Wundanyi Sub County',
  'Yatta Sub County',
  'Non-resident',
];

export default subCounties;
