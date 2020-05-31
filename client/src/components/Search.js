import React from 'react';




function Search({handleInput,search}) {
    return (
        <div>
            <section className="searchbox-wrap">
                <input type="text"
                 placeholder="Search for a movies..." 
                className="searchbox" 
                onChange={handleInput}
                onKeyPress={search}
                />

            </section>
        </div>
    )
}

export default Search;
