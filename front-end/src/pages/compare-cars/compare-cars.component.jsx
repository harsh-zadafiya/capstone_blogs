/*
    Author: Utsavkumar Jayantibhai Italiya - ut437158@dal.ca (B00935447)
*/
import axios from "../../utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompareCard from "../../components/CompareCard/CompareCard.component";
import { fetchBlogList } from "../../redux/compare-cars/blogCompare.reducers";
import { CarListingsWrapper, CarsList } from "../new-listings/newListings.styles";
import { FormWrapper, FormGroup, FormControl } from "../../components/SearchForm/searchForm.styled"

const ComparePage = () => {

    const [searchResults, setSearchResults] = useState([])
    const cars = useSelector((state) => state.blogCompare.cars);
    const dispatch = useDispatch();


    const fetchCars = useCallback(
        async (url) => {
            const { data: response } = await axios.get(url, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            });
            dispatch(fetchBlogList(response.cars));
            setSearchResults(cars)
        },
        [dispatch, searchResults]
    );

    function onSearch(event) {
        let searchKey = event.target.value.trim().toUpperCase();
        if (searchKey) {
            setSearchResults(searchResults.filter(ele => {
                return JSON.stringify(ele).toUpperCase().includes(searchKey)
            }));
        } else {
            setSearchResults(cars)
        }
        return
    }

    useEffect(() => {
        (async function () {
            await fetchCars("/comparecar/compare");
            setSearchResults(cars)
        })();
    }, [searchResults]);
    return (

        <>
            <FormWrapper >
                <FormGroup>
                    <FormControl placeholder="Search..." type="search" onInput={onSearch} onChange={onSearch} />
                </FormGroup>
            </FormWrapper>
            <hr />
            <CarListingsWrapper>
                <CarsList>
                    {searchResults.map((car) => (
                        <CompareCard car={car} key={car.vin} />
                    ))}
                </CarsList>
            </CarListingsWrapper>
        </>
    );
};


export default ComparePage;
