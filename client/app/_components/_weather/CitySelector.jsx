// "use client";

// import { Country, State, City } from "country-state-city";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Select from "react-select";
// import { GlobeIcon } from "@heroicons/react/solid";

// type option = {
// 	value: {
// 		latitude: string;
// 		longitude: string;
// 		isoCode: string;
// 	};
// 	label: string;
// } | null;

// type cityOption = {
// 	value: {
// 		latitude: string;
// 		longitude: string;
// 		countryCode: string;
// 		name: string;
// 		stateCode: string;
// 	};
// 	label: string;
// } | null;

// const options = Country.getAllCountries().map((country) => ({
// 	value: {
// 		latitude: country.latitude,
// 		longitude: country.longitude,
// 		isoCode: country.isoCode,
// 	},
// 	label: country.name,
// }));

// function CitySelector() {
// 	const [selectedCountry, setSelectedCountry] = useState<option>(null);
// 	const [selectedCity, setSelectedCity] = useState<cityOption>(null);
// 	const router = useRouter();

// 	const handleSelectedCountry = (option: option) => {
// 		setSelectedCountry(option);
// 		setSelectedCity(null);
// 	};

// 	const handleSelectedCity = (option: cityOption) => {
// 		setSelectedCity(option);
// 		router.push(
// 			`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
// 		);
// 	};
// 	return (
// 		<div className="space-y-4">
// 			<div className="space-y-2">
// 				<div className="flex items-center space-x-2 text-white/80">
// 					<GlobeIcon className="h-5 w-5 text-white" />
// 					<label htmlFor="country">Country</label>
// 				</div>
// 				<Select
// 					className="text-black"
// 					value={selectedCountry}
// 					onChange={handleSelectedCountry}
// 					options={options}
// 				/>
// 			</div>

// 			{selectedCountry && (
// 				<div className="space-y-2">
// 					<div className="flex items-center space-x-2 text-white/80">
// 						<GlobeIcon className="h-5 w-5 text-white" />
// 						<label htmlFor="country">City</label>
// 					</div>
// 					<Select
// 						className="text-black"
// 						value={selectedCity}
// 						onChange={handleSelectedCity}
// 						options={City.getCitiesOfCountry(
// 							selectedCountry.value.isoCode
// 						)?.map((state) => ({
// 							value: {
// 								latitude: state.latitude!,
// 								longitude: state.longitude!,
// 								countryCode: state.countryCode,
// 								name: state.name,
// 								stateCode: state.stateCode,
// 							},
// 							label: state.name,
// 						}))}
// 					/>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

// export default CitySelector;

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Select from "react-select";
// import { GlobeIcon } from "@heroicons/react/solid";
// import { Country, City } from "country-state-city";

// type Option = {
// 	value: {
// 		latitude: string;
// 		longitude: string;
// 		isoCode: string;
// 	};
// 	label: string;
// } | null;

// type CityOption = {
// 	value: {
// 		latitude: string;
// 		longitude: string;
// 		countryCode: string;
// 		name: string;
// 		stateCode: string;
// 	};
// 	label: string;
// } | null;

// const options = Country.getAllCountries().map((country) => ({
// 	value: {
// 		latitude: country.latitude || '',
// 		longitude: country.longitude || '',
// 		isoCode: country.isoCode || '',
// 	},
// 	label: country.name,
// }));

// function CitySelector() {
// 	const [selectedCountry, setSelectedCountry] = useState<Option>(null);
// 	const [selectedCity, setSelectedCity] = useState<CityOption>(null);
// 	const router = useRouter();

// 	useEffect(() => {
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(async (position) => {
// 				const { latitude, longitude } = position.coords;

// 				// Reverse geocoding to get country and city names
// 				const response = await fetch(
// 					`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
// 				);
// 				const data = await response.json();

// 				const countryName = data.address.country;
// 				const cityName = data.address.city || data.address.town || data.address.village;

// 				// Find the corresponding country
// 				const country = Country.getAllCountries().find(
// 					(country) => country.name === countryName
// 				);

// 				if (country) {
// 					const isoCode = country.isoCode || '';
// 					setSelectedCountry({
// 						value: {
// 							latitude: country.latitude || '',
// 							longitude: country.longitude || '',
// 							isoCode: isoCode,
// 						},
// 						label: country.name,
// 					});

// 					// Find the corresponding city
// 					const cityList = City.getCitiesOfCountry(isoCode);
// 					const city = cityList?.find(
// 						(city) => city.name === cityName
// 					);

// 					if (city) {
// 						setSelectedCity({
// 							value: {
// 								latitude: city.latitude || '',
// 								longitude: city.longitude || '',
// 								countryCode: city.countryCode || '',
// 								name: city.name,
// 								stateCode: city.stateCode || '',
// 							},
// 							label: city.name,
// 						});

// 						// Redirect to the location page
// 						router.push(
// 							`/location/${city.name}/${city.latitude}/${city.longitude}`
// 						);
// 					}
// 				}
// 			});
// 		}
// 	}, [router]);

// 	return (
// 		<div className="space-y-4">
// 			<div className="space-y-2">
// 				<div className="flex items-center space-x-2 text-white/80">
// 					<GlobeIcon className="h-5 w-5 text-white" />
// 					<label htmlFor="country">Country</label>
// 				</div>
// 				<Select
// 					className="text-black"
// 					value={selectedCountry}
// 					options={options}
// 					isDisabled
// 				/>
// 			</div>

// 			{selectedCity && (
// 				<div className="space-y-2">
// 					<div className="flex items-center space-x-2 text-white/80">
// 						<GlobeIcon className="h-5 w-5 text-white" />
// 						<label htmlFor="city">City</label>
// 					</div>
// 					<Select
// 						className="text-black"
// 						value={selectedCity}
// 						options={[]}
// 						isDisabled
// 					/>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

// export default CitySelector;


// ********************************************************************************************************************************************


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Select from "react-select";
// import { GlobeIcon } from "@heroicons/react/solid";
// import { Country, City } from "country-state-city";

// const options = Country.getAllCountries().map((country) => ({
//   value: {
//     latitude: country.latitude || '',
//     longitude: country.longitude || '',
//     isoCode: country.isoCode || '',
//   },
//   label: country.name,
// }));

// function CitySelector() {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;

//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
//         );
//         const data = await response.json();

//         const countryName = data.address.country;
//         const cityName = data.address.city || data.address.town || data.address.village;

//         const country = Country.getAllCountries().find(
//           (country) => country.name === countryName
//         );

//         if (country) {
//           const isoCode = country.isoCode || '';
//           setSelectedCountry({
//             value: {
//               latitude: country.latitude || '',
//               longitude: country.longitude || '',
//               isoCode: isoCode,
//             },
//             label: country.name,
//           });

//           const cityList = City.getCitiesOfCountry(isoCode);
//           const city = cityList?.find(
//             (city) => city.name === cityName
//           );

//           if (city) {
//             setSelectedCity({
//               value: {
//                 latitude: city.latitude || '',
//                 longitude: city.longitude || '',
//                 countryCode: city.countryCode || '',
//                 name: city.name,
//                 stateCode: city.stateCode || '',
//               },
//               label: city.name,
//             });

//             router.push(
//               `/weather/location/${city.name}/${city.latitude}/${city.longitude}`
//             );
//           }
//         }
//       });
//     }
//   }, [router]);

//   return (
//     <div className="hidden">
//       <div className="space-y-4">
//         <div className="space-y-2">
//           <div className="flex items-center space-x-2 text-white/80">
//             <GlobeIcon className="h-5 w-5 text-white" />
//             <label htmlFor="country">Country</label>
//           </div>
//           <Select
//             className="text-black"
//             value={selectedCountry}
//             options={options}
//             isDisabled
//           />
//         </div>

//         {selectedCity && (
//           <div className="space-y-2">
//             <div className="flex items-center space-x-2 text-white/80">
//               <GlobeIcon className="h-5 w-5 text-white" />
//               <label htmlFor="city">City</label>
//             </div>
//             <Select
//               className="text-black"
//               value={selectedCity}
//               options={[]}
//               isDisabled
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CitySelector;


// // ******************************************************************************************************************************************\











"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { GlobeIcon } from "@heroicons/react/solid";
import { Country, City } from "country-state-city";

// Get all country options
const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude || '',
    longitude: country.longitude || '',
    isoCode: country.isoCode || '',
  },
  label: country.name,
}));

function CitySelector() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Set default country and city as India and Udupi
    const defaultCountry = Country.getAllCountries().find(
      (country) => country.name === "India"
    );

    const defaultCity = City.getCitiesOfCountry(defaultCountry.isoCode).find(
      (city) => city.name === "Pune"
    );

    setSelectedCountry({
      value: {
        latitude: defaultCountry.latitude || '',
        longitude: defaultCountry.longitude || '',
        isoCode: defaultCountry.isoCode || '',
      },
      label: defaultCountry.name,
    });

    setSelectedCity({
      value: {
        latitude: defaultCity.latitude || '',
        longitude: defaultCity.longitude || '',
        countryCode: defaultCity.countryCode || '',
        name: defaultCity.name,
        stateCode: defaultCity.stateCode || '',
      },
      label: defaultCity.name,
    });

    // Automatically navigate to the default city (Udupi)
    router.push(
      `/weather/location/${defaultCity.name}/${defaultCity.latitude}/${defaultCity.longitude}`
    );
  }, [router]);

  return (
    <div className="hidden">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">Country</label>
          </div>
          <Select
            className="text-black"
            value={selectedCountry}
            options={options}
            isDisabled
          />
        </div>

        {selectedCity && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white/80">
              <GlobeIcon className="h-5 w-5 text-white" />
              <label htmlFor="city">City</label>
            </div>
            <Select
              className="text-black"
              value={selectedCity}
              options={[]}
              isDisabled
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CitySelector;
