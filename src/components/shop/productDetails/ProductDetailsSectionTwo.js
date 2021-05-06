import React, { Fragment, useContext, useEffect, useState } from 'react'
import { isAuthenticate } from '../auth/fetchApi'
import { LayoutContext } from '../layout'
import { ProductDetailsContext } from './'
import AllReviews from './AllReviews'
import ReviewForm from './ReviewForm'
import './style.css'

const Menu = () => {
    const { data, dispatch } = useContext(ProductDetailsContext)
    const { data: layoutData } = useContext(LayoutContext)

    return (
        <Fragment>
            <div className="flex flex-col items-center justify-center md:flex-row">
                <div
                    onClick={(e) => dispatch({ type: 'menu', payload: true })}
                    className={`${
                        data.menu ? 'border-b-2 border-yellow-700' : ''
                    } px-4 py-3 cursor-pointer`}
                >
                    Description
                </div>
                <div
                    onClick={(e) => dispatch({ type: 'menu', payload: false })}
                    className={`${
                        !data.menu ? 'border-b-2 border-yellow-700' : ''
                    } px-4 py-3 relative flex cursor-pointer`}
                >
                    <span>Reviews</span>
                    {/* <span className="absolute top-0 right-0 px-1 mt-2 text-xs text-white bg-yellow-700 rounded">
            {layoutData.singleProductDetail.pRatingsReviews.length}
          </span> */}
                </div>
            </div>
        </Fragment>
    )
}

const RatingReview = () => {
    return (
        <Fragment>
            <AllReviews />
            {isAuthenticate() ? (
                <ReviewForm />
            ) : (
                <div className="px-4 py-2 mb-4 mb-12 bg-red-200 rounded md:mx-16 lg:mx-20 xl:mx-24">
                    You need to login in for review
                </div>
            )}
        </Fragment>
    )
}

const ProductDetailsSectionTwo = (props) => {
    const { data } = useContext(ProductDetailsContext)
    const { data: layoutData } = useContext(LayoutContext)
    const [singleProduct, setSingleproduct] = useState({})

    useEffect(() => {
        setSingleproduct(
            layoutData.singleProductDetail ? layoutData.singleProductDetail : ''
        )
    }, [])

    return (
        <Fragment>
            <section className="m-4 md:mx-12 md:my-8">
                <Menu />
                {data.menu ? (
                    <div className="mt-6">{singleProduct.pDescription}</div>
                ) : (
                    <RatingReview />
                )}
            </section>
            <div className="flex justify-center px-4 py-4 m-4 space-x-4 font-light tracking-widest text-gray-800 capitalize bg-white border-t border-b md:mx-8 md:my-6">
                <div>
                    <span>Category :</span>
                    <span className="text-sm text-gray-600">
                        {' '}
                        {singleProduct.pCategory
                            ? singleProduct.pCategory.cName
                            : ''}
                    </span>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductDetailsSectionTwo
