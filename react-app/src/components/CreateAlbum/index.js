import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CreateAlbum.css'
import { thunkCreateAlbum } from '../../store/albums'

export default function CreateAlbum() {

    return (
        <div>
            <form>
                <div className='album-form'>
                    <div className='upper-side'>
                        <div className='left-create'>
                            <div>title</div>
                            <div>description</div>
                        </div>
                        <div className='select-photos'>
                            <div>Photos</div>
                        </div>
                    </div>
                    <div className='buttom-side'>
                        <button>Submit</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
