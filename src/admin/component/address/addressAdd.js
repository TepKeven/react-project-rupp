import React from "react";
import { useSelector } from "react-redux";

function AddressAddComponent({addressIndex = 0, countries = []}){

    const getAddrTab = useSelector((state) => state.getAddrTab);

    return (
        <div className={"row m-0 " + (getAddrTab === `#customer_address_${addressIndex}` ? "" : "d-none" )} id={`customer_address_${addressIndex}`} >
            <div class="mb-4">
                <label for={`address_firstname_${addressIndex}`} class="form-label">
                    First Name
                </label>
                <input
                    type="text"
                    class="form-control"
                    id={`address_firstname_${addressIndex}`}
                    name={`address_description[${addressIndex}][first_name]`}
                />
            </div>   
            <div class="mb-4">
                <label for={`address_firstname_${addressIndex}`} class="form-label">
                Last Name
                </label>
                <input
                    type="text"
                    class="form-control"
                    id={`address_firstname_${addressIndex}`}
                    name={`address_description[${addressIndex}][last_name]`}
                />
            </div> 
            <div class="mb-4">
                <label for={`address_company_${addressIndex}`} class="form-label">
                    Company
                </label>
                <input
                    type="text"
                    class="form-control"
                    id={`address_company_${addressIndex}`}
                    name={`address_description[${addressIndex}][company]`}
                />
            </div> 
            <div class="mb-4">
                <label for={`address_adress_${addressIndex}`} class="form-label">
                    Address
                </label>
                <input
                    type="text"
                    class="form-control"
                    id={`address_adress_${addressIndex}`}
                    name={`address_description[${addressIndex}][address]`}
                />
            </div> 
            <div class="mb-4">
                <label for={`address_city_${addressIndex}`} class="form-label">
                    City
                </label>
                <input
                    type="text"
                    class="form-control"
                    id={`address_city_${addressIndex}`}
                    name={`address_description[${addressIndex}][city]`}
                />
            </div> 
            <div class="mb-4">
                <label for={`address_postcode_${addressIndex}`} class="form-label">
                    Postal Code
                </label>
                <input
                    type="text"
                    class="form-control"
                    id={`address_postcode_${addressIndex}`}
                    name={`address_description[${addressIndex}][postcode]`}
                />
            </div> 
            <div class="mb-4">
                <label for={`address_country_${addressIndex}`} class="form-label">
                    Country
                </label>
                <select id={`address_country_${addressIndex}`} name={`address_description[${addressIndex}][country_id]`} class="form-control">
                    {countries.map(country => (
                        <option value={country.country_id}>{country.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default AddressAddComponent