import React from 'react';

import Title from './Title';
import Description from './Description';
import ImagePath from './ImagePath';

const InfoCard = (props) => {
    return (
        <div class="jumbotron"> 
            <div class="col">
                <Title text="Nicks Info" />
                <Description text="Hi Im Nick Nice to meet you" />
                <ImagePath text="https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg" />
            </div>
        </div> 
    );
};

export default InfoCard;