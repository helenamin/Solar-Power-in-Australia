import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask import render_template, redirect


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///SQL/SGU.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Install = Base.classes.installation
Output = Base.classes.output
Income = Base.classes.income
Rebate = Base.classes.rebate
Suburbs = Base.classes.suburbs

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
@app.route("/home")
def home():

    # Return template and data
    return render_template("index.html")




@app.route("/about")
def about():

    # Return template and data
    return render_template("about.html")




@app.route("/national")
def national():

    # Return template and data
    return render_template("national.html")




@app.route("/map")
def map():

    # Return template and data
    return render_template("map.html")





@app.route("/api/v1.0/install")
def installs():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of install data"""
    # Query all outputs
    results = session.query(Install.postcode, Install._2001, Install._2002, Install._2003, Install._2004, Install._2005, Install._2006, Install._2007, Install._2008, Install._2009, Install._2010,
                            Install._2011, Install._2012, Install._2013, Install._2014, Install._2015, Install._2016, Install._2017, Install._2018, Install._2019, Install._2020, Install._2021, Install.AVG, Install.Total).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_installs = []
    for postcode, _2001, _2002, _2003, _2004, _2005, _2006, _2007, _2008, _2009, _2010, _2011, _2012, _2013, _2014, _2015, _2016, _2017, _2018, _2019, _2020, _2021, AVG, Total in results:
        install_dict = {}
        install_dict["postcode"] = postcode
        install_dict["_2001"] = _2001
        install_dict["_2002"] = _2002
        install_dict["_2003"] = _2003
        install_dict["_2004"] = _2004
        install_dict["_2005"] = _2005
        install_dict["_2006"] = _2006
        install_dict["_2007"] = _2007
        install_dict["_2007"] = _2007
        install_dict["_2008"] = _2008
        install_dict["_2009"] = _2009
        install_dict["_2010"] = _2010
        install_dict["_2011"] = _2011
        install_dict["_2012"] = _2012
        install_dict["_2013"] = _2013
        install_dict["_2014"] = _2014
        install_dict["_2015"] = _2015
        install_dict["_2016"] = _2016
        install_dict["_2017"] = _2017
        install_dict["_2018"] = _2018
        install_dict["_2019"] = _2019
        install_dict["_2020"] = _2020
        install_dict["_2021"] = _2021
        install_dict["AVG"] = AVG
        install_dict["Total"] = Total
        all_installs.append(install_dict)

    return jsonify(all_installs)






@app.route("/api/v1.0/output")
def outputs():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of output data"""
    # Query all outputs
    results = session.query(Output.postcode, Output._2001, Output._2002, Output._2003, Output._2004, Output._2005, Output._2006, Output._2007, Output._2008, Output._2009, Output._2010,
                            Output._2011, Output._2012, Output._2013, Output._2014, Output._2015, Output._2016, Output._2017, Output._2018, Output._2019, Output._2020, Output._2021, Output.AVG, Output.Total).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_outputs = []
    for postcode, _2001, _2002, _2003, _2004, _2005, _2006, _2007, _2008, _2009, _2010, _2011, _2012, _2013, _2014, _2015, _2016, _2017, _2018, _2019, _2020, _2021, AVG, Total in results:
        output_dict = {}
        output_dict["postcode"] = postcode
        output_dict["_2001"] = _2001
        output_dict["_2002"] = _2002
        output_dict["_2003"] = _2003
        output_dict["_2004"] = _2004
        output_dict["_2005"] = _2005
        output_dict["_2006"] = _2006
        output_dict["_2007"] = _2007
        output_dict["_2007"] = _2007
        output_dict["_2008"] = _2008
        output_dict["_2009"] = _2009
        output_dict["_2010"] = _2010
        output_dict["_2011"] = _2011
        output_dict["_2012"] = _2012
        output_dict["_2013"] = _2013
        output_dict["_2014"] = _2014
        output_dict["_2015"] = _2015
        output_dict["_2016"] = _2016
        output_dict["_2017"] = _2017
        output_dict["_2018"] = _2018
        output_dict["_2019"] = _2019
        output_dict["_2020"] = _2020
        output_dict["_2021"] = _2021
        output_dict["AVG"] = AVG
        output_dict["Total"] = Total
        all_outputs.append(output_dict)

    return jsonify(all_outputs)






@app.route("/api/v1.0/income")
def incomes():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of income data"""
    # Query all outputs
    results = session.query(
        Income.Postcode, Income.Average_total, Income.Average_salary).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_incomes = []
    for Postcode, Average_total, Average_salary in results:
        income_dict = {}
        income_dict["postcode"] = Postcode
        income_dict["Average_total"] = Average_total
        income_dict["Average_salary"] = Average_salary
        all_incomes.append(income_dict)

    return jsonify(all_incomes)






@app.route("/api/v1.0/rebate")
def rebates():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of rebate data """
    # Query all outputs
    results = session.query(Rebate.postcode, Rebate.zone,
                            Rebate.rating, Rebate.annual_prod, Rebate.rebate).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_rebates = []
    for postcode, zone, rating, annual_prod, rebate in results:
        rebate_dict = {}
        rebate_dict["postcode"] = postcode
        rebate_dict["zone"] = zone
        rebate_dict["rating"] = rating
        rebate_dict["annual_prod"] = annual_prod
        rebate_dict["rebate"] = rebate
        all_rebates.append(rebate_dict)

    return jsonify(all_rebates)






@app.route("/api/v1.0/suburbs")
def suburbs():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of suburb data """
    # Query all outputs
    results = session.query(Suburbs.postcode, Suburbs.suburb_id, Suburbs.suburb,
                            Suburbs.state, Suburbs.long, Suburbs.lat).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_suburbs = []
    for postcode, suburb_id, suburb, state, long, lat in results:
        suburb_dict = {}
        suburb_dict["postcode"] = postcode
        suburb_dict["suburb_id"] = suburb_id
        suburb_dict["suburb"] = suburb
        suburb_dict["state"] = state
        suburb_dict["lat"] = lat
        suburb_dict["long"] = long
        all_suburbs.append(suburb_dict)

    return jsonify(all_suburbs)





if __name__ == '__main__':
    app.run(port=5500, debug=True)
